import axios from "axios";
const API_URL = "http://localhost:8000";

interface IGetFullCategoryInfo {
	categories_data: {
		id: number;
		name: string;
		description: string;
	}[];
	nextLink: string;
	upper_category_data: { name: string; description: string };
}

interface ICreateUpdate {
	id?: number;
	upperCategoryID?: number;
	name: string;
	description: string;
}

interface IGetCategory {
	data: {
		name: string;
		description: string;
	};
	upper_category_name: string;
}

export default class CategoryService {
	async getCategories(upperCategoryID: number) {
		const url = `${API_URL}/api/categories/${upperCategoryID}`;
		const response = await axios.get<IGetFullCategoryInfo>(url);
		return response.data;
	}
	async getCategoriesByURL(link: string) {
		const url = `${API_URL}${link}`;
		const response = await axios.get<IGetFullCategoryInfo>(url);
		return response.data;
	}
	async getCategory(categoryID: number) {
		const url = `${API_URL}/api/category/${categoryID}`;
		const response = await axios.get<IGetCategory>(url);
		return response.data;
	}
	deleteCategory(categoryID: number) {
		const url = `${API_URL}/api/category/${categoryID}`;
		return axios.delete<void>(url);
	}
	createCategory(category: ICreateUpdate) {
		const url = `${API_URL}/api/category/${category.upperCategoryID}`;
		return axios.post<void>(url, category);
	}
	updateCategory(category: ICreateUpdate) {
		const url = `${API_URL}/api/category/${category.id}`;
		return axios.put<void>(url, category);
	}
}
