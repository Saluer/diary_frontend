export enum EActions {
	create = "create",
	update = "update"
}

export enum EEntityTypes{
	category="category",
	flow="flow"
}

export interface IParams {
	categoryID?: string;
	flowID?: string;
	action?: string;
}

export interface ICategoryFormState {
	containerName?: string;
	name: string;
	description: string;
}

export interface IFlowFormState {
	categoryName: string;
	name: string;
	description: string;
}

export interface ICreateUpdateCategory {
	id?: number;
	upperCategoryID?: number;
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