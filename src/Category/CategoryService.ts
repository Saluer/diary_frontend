import axios from "axios";
// import { any } from "../types";
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
	async getCategory(category:any) {
		const url = `${API_URL}/api/category/${category.id}`;
		const response = await axios.get(url);
		return response.data;
	}
	deleteCategory(category:any) {
		const url = `${API_URL}/api/category/${category.id}`;
		return axios.delete(url);
	}
	createCategory(category:any) {
		const url = `${API_URL}/api/category/${category.upperCategoryId}`;
		return axios.post(url, category);
	}
	updateCategory(category:any) {
		const url = `${API_URL}/api/category/${category.id}`;
		return axios.put(url, category);
	}
}
