import axios from "axios";
const API_URL = "http://localhost:8000";

interface CategoriesListData{
	categories_data: {
		id: number;
		name: string;
		description: string;
	}[];
	nextLink: string;
	upper_category_data: { name: string; description: string };
}

export default class CategoryService {
	async getCategories(upperCategoryID: number):Promise<CategoriesListData> {
		const url = `${API_URL}/api/categories/${upperCategoryID}`;
		const response = await axios.get<CategoriesListData>(url);
		console.log(response)
		return response.data;
	}
	async getCategoriesByURL(link: string): Promise<CategoriesListData> {
		const url = `${API_URL}${link}`;
		const response = await axios.get<CategoriesListData>(url);
		console.log(response.data)
		return response.data;
	}
	async getCategory(categoryID: number): Promise<{
		data: {
			name: string;
			description: string;
		};
		upper_category_name: string;
	}> {
		const url = `${API_URL}/api/category/${categoryID}`;
		const response = await axios.get<{
			data: {
				name: string;
				description: string;
			};
			upper_category_name: string;
		}>(url);
		return response.data;
	}
	deleteCategory(categoryID: number) {
		const url = `${API_URL}/api/category/${categoryID}`;
		return axios.delete(url);
	}
	createCategory(category: {
		upperCategoryID: number;
		name: string;
		description: string;
	}) {
		const url = `${API_URL}/api/category/${category.upperCategoryID}`;
		return axios.post(url, category);
	}
	updateCategory(category: { id: number; name: string; description: string }) {
		const url = `${API_URL}/api/category/${category.id}`;
		return axios.put(url, category);
	}
}
