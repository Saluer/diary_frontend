export enum EActions {
	create = "create",
	update = "update"
}

export enum EEntityTypes {
	category = "category",
	flow = "flow"
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

export interface IGetFullCategoryInfo {
	categories_data: {
		id: number;
		name: string;
		description: string;
	}[];
	nextLink: string;
	upper_category_data: { name: string; description: string };
}


export interface IGetCategory {
	data: {
		name: string;
		description: string;
	};
	upper_category_name: string;
}

export interface ICreateUpdateFlow {
	id?: number;
	categoryID?: number;
	name: string;
	description: string;
}
export interface IGetFlowsList{
	flows_data: {
		id: number;
		name: string;
		description: string;
	}[];
	nextLink: string;
}

export interface ICreateUpdateFlow {
	id?: number;
	categoryID?: number;
	name: string;
	description: string;
}

export interface IGetFlow {
	data: {
		name: string;
		description: string;
	};
	category_name:string;
}

