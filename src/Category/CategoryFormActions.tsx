import { EActions } from "../types";
import CategoryService from "./CategoryService";

const categoryService = new CategoryService();

abstract class EntityFormActions {
    abstract initialize(actionType:any, callback:any, id:any):any;
    abstract handleSubmit():any;
}

export class CategoryFormActions extends EntityFormActions {
    initialize(actionType:any, callback:any, id:any, ):any{
        if(actionType === EActions.create){
            categoryService.getCategory(id).then((category: {
                data: {
                    name: string;
                    description: string;
                },
                upper_category_name: string;
            }) => {
                callback({upperCategoryName: category.data.name});
            });
        }
        else if(actionType === EActions.update){
            categoryService.getCategory(id).then((category: {
                data: {
                    name: string;
                    description: string;
                },
                upper_category_name: string;
            }) => {
                if (category.upper_category_name)
                    callback({upperCategoryName:category.upper_category_name});
                const categoryData = category.data;
                callback({
                    name: categoryData.name,
                    description: categoryData.description,
                });
            });
        }
    };
    handleSubmit():any{};
}

