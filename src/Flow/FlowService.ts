import axios from "axios";
const API_URL = "http://localhost:8000";

export default class FlowSerivce {
	//!
	async getFlows(flow: { categoryID: string }) {
		const url = `${API_URL}/api/flows/${flow.categoryID}`;
		const response = await axios.get(url);
		return response.data;
	}
	async getFlow(flow: { id: string }) {
		const url = `${API_URL}/api/flow/${flow.id}`;
		const response = await axios.get(url);
		return response.data;
	}
	deleteFlow(flow: { id: string }) {
		const url = `${API_URL}/api/flow/${flow.id}`;
		return axios.delete(url);
	}
	createFlow(flow: { category: string; name: string; description: string }) {
		const url = `${API_URL}/api/flow/${flow.category}`;
		return axios.post(url, flow);
	}
	updateFlow(flow: { id: string; name: string; description: string }) {
		const url = `${API_URL}/api/flow/${flow.id}`;
		return axios.put(url, flow);
	}
}
