import { EActions } from "../types";
import CategoryService from "./CategoryService";
import FlowService from "../Flow/FlowService";
const categoryService = new CategoryService();
const flowService = new FlowService();

abstract class EntityFormActions {
    abstract initialize(actionType: any, callback: any, id: any): any;
    abstract handleSubmit(): any;
}

export class CategoryFormActions extends EntityFormActions {
    initialize(actionType: any, callback: any, id: any): any {
        if (actionType === EActions.create) {
            categoryService.getCategory(id).then((category: {
                data: {
                    name: string;
                    description: string;
                },
                upper_category_name: string;
            }) => {
                callback({ containerName: category.data.name });
            });
        }
        else if (actionType === EActions.update) {
            categoryService.getCategory(id).then((category: {
                data: {
                    name: string;
                    description: string;
                },
                upper_category_name: string;
            }) => {
                if (category.upper_category_name)
                    callback({ containerName: category.upper_category_name });
                const categoryData = category.data;
                callback({
                    name: categoryData.name,
                    description: categoryData.description,
                });
            });
        }
    };
    handleSubmit(): any { };
}

export class FlowFormActions extends EntityFormActions {
    initialize(actionType: any, callback: any, id: any,): any {
        if (actionType === EActions.create) {
            categoryService.getCategory(id).then((category: {
                data: {
                    name: string;
                    description: string;
                },
                upper_category_name: string;
            }) => {
                callback({ containerName: category.data.name });
            });
        }
        else if (actionType === EActions.update) {
            flowService.getFlow(id).then((flow) => {
				if (flow.category_name)
					callback({ containerName: flow.category_name });
				const flowData = flow.data;
				callback({ name: flowData.name, description: flowData.description });
			});
        }
    };
    handleSubmit(): any { };
}

