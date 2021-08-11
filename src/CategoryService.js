import axios from "axios";
const API_URL = "http://localhost:8000";

export default class CategoryService {
	getCategories(upperCategoryID = "") {
		const url = `${API_URL}/api/categories/${upperCategoryID}`;
		return axios.get(url).then((response) => response.data);
	}
	getCategoriesByURL(link) {
		const url = `${API_URL}${link}`;
		return axios.get(url).then((response) => response.data);
	}
	getCategory(pk) {
        console.log("🚀 ~ file: CategoryService.js ~ line 14 ~ CategoryService ~ getCategory ~ pk", pk)
		const url = `${API_URL}/api/category/${pk}`;
		return axios.get(url).then((response) => response.data);
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
