import axios from "axios";
const API_URL = "http://localhost:8000";

export default class CategoryService {
	async getCategories(upperCategoryID = "") {
		const url = `${API_URL}/api/categories/${upperCategoryID}`;
		const response = await axios.get(url);
		return response.data;
	}
	async getCategoriesByURL(link) {
		const url = `${API_URL}${link}`;
		const response = await axios.get(url);
		return response.data;
	}
	async getCategory(category) {
		const url = `${API_URL}/api/category/${category.id}`;
		const response = await axios.get(url);
		return response.data;
	}
	deleteCategory(category) {
		const url = `${API_URL}/api/category/${category.id}`;
		return axios.delete(url);
	}
	createCategory(category) {
		const url = `${API_URL}/api/category/${category.upperCategoryId}`;
		return axios.post(url, category);
	}
	updateCategory(category) {
		const url = `${API_URL}/api/category/${category.id}`;
		return axios.put(url, category);
	}
}
