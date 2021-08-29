import axios from "axios";
const API_URL = "http://localhost:8000";

export default class FlowSerivce{
    async getFlows(categoryId) {
		const url = `${API_URL}/api/flows/${categoryId}`;
		const response = await axios.get(url);
		return response.data;
	}
	async getFlow(flow) {
		const url = `${API_URL}/api/flow/${flow.id}`;
		const response = await axios.get(url);
		return response.data;
	}
	deleteFlow(flow) {
		const url = `${API_URL}/api/flow/${flow.id}`;
		return axios.delete(url);
	}
	createFlow(flow, categoryId) {
		const url = `${API_URL}/api/flow/${categoryId}`;
		return axios.post(url, flow);
	}
	updateFlow(flow) {
		const url = `${API_URL}/api/flow/${flow.id}`;
		return axios.put(url, flow);
	}
}