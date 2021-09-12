import axios from "axios";
const API_URL = "http://localhost:8000";


export default class CategoryService {
	
	async getCategories(upperCategoryID:number) {
		const url = `${API_URL}/api/categories/${upperCategoryID}`;
		const response = await axios.get(url);
		return response.data;
	}
	async getCategoriesByURL(link:string) {
		const url = `${API_URL}${link}`;
		const response = await axios.get(url);
		return response.data;
	}
	async getCategory(categoryID:number) {
		const url = `${API_URL}/api/category/${categoryID}`;
		const response = await axios.get(url);
		return response.data;
	}
	deleteCategory(categoryID:number) {
		const url = `${API_URL}/api/category/${categoryID}`;
		return axios.delete(url);
	}
	createCategory(category:{upperCategoryID:number, name:string, description:string}) {
		const url = `${API_URL}/api/category/${category.upperCategoryID}`;
		return axios.post(url, category);
	}
	updateCategory(category:{id:number, name:string, description:string}) {
		const url = `${API_URL}/api/category/${category.id}`;
		return axios.put(url, category);
	}
}
