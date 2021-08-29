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
	async getCategory(pk) {
		const url = `${API_URL}/api/category/${pk}`;
		const response = await axios.get(url);
		return response.data;
	}
	deleteCategory(category) {
		const url = `${API_URL}/api/category/${category.id}`;
		return axios.delete(url);
	}
	createCategory(category, upperCategoryID = "") {
		console.log(upperCategoryID)
		const url = `${API_URL}/api/category/${upperCategoryID}`;
		return axios.post(url, category);
	}
	updateCategory(category) {
		const url = `${API_URL}/api/category/${category.category_id}`;
		return axios.put(url, category);
	}
}
