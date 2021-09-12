import axios from "axios";
const API_URL = "http://localhost:8000";


export default class CategoryService {
	
	async getCategories(upperCategoryID="") {
		const url = `${API_URL}/api/categories/${upperCategoryID}`;
		const response = await axios.get(url);
		return response.data;
	}
	async getCategoriesByURL(link:string) {
		const url = `${API_URL}${link}`;
		const response = await axios.get(url);
		return response.data;
	}
	async getCategory(categoryID:string) {
		const url = `${API_URL}/api/category/${categoryID}`;
		const response = await axios.get(url);
		return response.data;
	}
	deleteCategory(category:{id:number}) {
		const url = `${API_URL}/api/category/${category.id}`;
		return axios.delete(url);
	}
	createCategory(category:{upperCategoryID:string, name:string, description:string}) {
		const url = `${API_URL}/api/category/${category.upperCategoryID}`;
		return axios.post(url, category);
	}
	updateCategory(category:{id:string, name:string, description:string}) {
		const url = `${API_URL}/api/category/${category.id}`;
		return axios.put(url, category);
	}
}
