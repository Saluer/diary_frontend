export interface IParams {
	categoryID?: string;
	flowID?:string;
	action?: "create" | "update";
}



export interface ICategoryFormState {
	upperCategoryName?: string;
	name: string;
	description: string;
}

export interface IFlowFormState {
	categoryName: string;
	name: string;
	description: string;
}

// export interface ICategoryAPI {
// 	id?: string;
// 	upperCategoryId?: string;
// 	name?: string;
// 	description?: string;
// }

// export interface IFlowActions {
// 	id?: string;
// 	categoryId?: string;
// 	name?: string;
// 	description?: string;
// }