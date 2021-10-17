import { EActions, ICreateUpdateCategory } from "../../utils/types";
import { CategoryService } from "../../Category/CategoryService";
import { FlowService } from "../../FlowService";
import { AxiosResponse } from "axios";
import {
	CREATION_ERROR_MESSAGE,
	CREATION_SUCCESS_MESSAGE,
	MAIN_CATEGORY,
	UPDATE_ERROR_MESSAGE,
	UPDATE_SUCCESS_MESSAGE,
} from "../../utils/constants";

const categoryService = new CategoryService();
const flowService = new FlowService();

export class CategoryFormActions {
	private categoryID: number;
	constructor(data: { categoryID: number }) {
		this.categoryID = data.categoryID;
	}
	initialize(actionType: string, callback: (value: { containerName?: string, name?: string, description?: string }) => void,
		idGroup: { categoryID: number, flowID?: number }): void {
		if (actionType === EActions.create) {
			categoryService.getCategory(idGroup.categoryID).then(
				(category: {
					data: {
						name: string;
						description: string;
					};
					upper_category_name: string;
				}) => {
					callback({ containerName: category.data.name });
				}
			);
		} else if (actionType === EActions.update) {
			categoryService.getCategory(idGroup.categoryID).then(
				(category: {
					data: {
						name: string;
						description: string;
					};
					upper_category_name: string;
				}) => {
					if (category.upper_category_name)
						callback({ containerName: category.upper_category_name });
					const categoryData = category.data;
					callback({
						name: categoryData.name,
						description: categoryData.description,
					});
				}
			);
		}
	}
	handleSubmit(
		submitType: string,
		formData: ICreateUpdateCategory,
		callback: (path: string) => void
	): void {
		let submitFunction: Promise<AxiosResponse<void>>;
		let successMessageText = "",
			errorMessageText = "",
			path = "";
		switch (submitType) {
			case EActions.update:
				successMessageText = UPDATE_SUCCESS_MESSAGE;
				errorMessageText = UPDATE_ERROR_MESSAGE;
				submitFunction = categoryService.updateCategory(formData);
				console.log(this.categoryID)
				path =
					this.categoryID !== MAIN_CATEGORY
						? "/category/" + this.categoryID
						: "/";
				break;
			case EActions.create:
				successMessageText = CREATION_SUCCESS_MESSAGE;
				errorMessageText = CREATION_ERROR_MESSAGE;
				submitFunction = categoryService.createCategory(formData);
				console.log(this.categoryID)
				path =
					this.categoryID !== MAIN_CATEGORY
						? "/category/" + this.categoryID
						: "/";
				break;
			default:
				console.log("Submit error");
				return;
		}

		submitFunction
			.then(() => {
				alert(successMessageText);
				callback(path);
			})
			.catch(() => {
				alert(errorMessageText);
			});
	}
}

export class FlowFormActions {
	private categoryID: number;
	private flowID: number;
	constructor(data: { categoryID: number, flowID: number }) {
		this.categoryID = data.categoryID;
		this.flowID = data.flowID;
	}
	initialize(actionType: string, callback: (value: { containerName?: string, name?: string, description?: string }) => void,
		idGroup: { categoryID: number, flowID: number }): void {
		if (actionType === EActions.create) {
			categoryService.getCategory(idGroup.categoryID).then(
				(category: {
					data: {
						name: string;
						description: string;
					};
					upper_category_name: string;
				}) => {
					callback({ containerName: category.data.name });
				}
			);
		} else if (actionType === EActions.update) {
			flowService.getFlow(idGroup.flowID).then((flow: any) => {
				if (flow.category_name) callback({ containerName: flow.category_name });
				const flowData = flow.data;
				callback({ name: flowData.name, description: flowData.description });
			});
		}
	}
	handleSubmit(
		submitType: string,
		formData: ICreateUpdateCategory,
		callback: (path: string) => void
	): void {
		let submitFunction: Promise<AxiosResponse<void>>;
		let successMessageText = "",
			errorMessageText = "",
			path = "";
		switch (submitType) {
			case EActions.update:
				successMessageText = UPDATE_SUCCESS_MESSAGE;
				errorMessageText = UPDATE_ERROR_MESSAGE;
				submitFunction = flowService.updateFlow(formData);
				path = "/category/" + this.categoryID + "/flow/" + this.flowID;
				break;
			case EActions.create:
				successMessageText = CREATION_SUCCESS_MESSAGE;
				errorMessageText = CREATION_ERROR_MESSAGE;
				submitFunction = flowService.createFlow(formData);
				path = "/category/" + this.categoryID;
				break;
			default:
				console.log("Submit error");
				return;
		}

		submitFunction
			.then(() => {
				alert(successMessageText);
				callback(path);
			})
			.catch(() => {
				alert(errorMessageText);
			});
	}
}
