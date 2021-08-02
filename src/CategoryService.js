import axios from "axios";
const API_URL = "http://localhost:8000";

export default class CategoryService {

	getCategories(uppcat_id="") {
		const url = `${API_URL}/api/categories/${uppcat_id}`;
		return axios.get(url).then((response) => response.data);
	}
	getCategoriesByURL(link) {
		const url = `${API_URL}${link}`;
		return axios.get(url).then((response) => response.data);
	}
	// getCategory(id) {
	// 	const url = `${API_URL}/api/categories/${id}`;
	// 	return axios.get(url).then((response) => response.data);
	// }
	deleteCategory(category) {
		const url = `${API_URL}/api/categories/${category.id}`;
		return axios.delete(url);
	}
	createCategory(category, uppcat_id="") {
		const url = `${API_URL}/api/categories/${uppcat_id}`;
		return axios.post(url, category);
	}
	updateCategory(category) {
		const url = `${API_URL}/api/categories/${category.id}`;
		return axios.put(url, category);
	}
}
