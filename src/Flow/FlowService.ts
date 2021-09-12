import axios from "axios";
const API_URL = "http://localhost:8000";

export default class FlowSerivce {
	//!
	async getFlows(categoryID:string) {
		const url = `${API_URL}/api/flows/${categoryID}`;
		const response = await axios.get(url);
		return response.data;
	}
	async getFlow(flowID :string) {
		const url = `${API_URL}/api/flow/${flowID}`;
		const response = await axios.get(url);
		return response.data;
	}
	deleteFlow(flow: { id: number }) {
		const url = `${API_URL}/api/flow/${flow.id}`;
		return axios.delete(url);
	}
	createFlow(flow: { category: string; name: string; description: string }) {
		const url = `${API_URL}/api/flow/${flow.category}`;
		return axios.post(url, flow);
	}
	updateFlow(flow: { name: string; description: string }, flowID:string) {
		const url = `${API_URL}/api/flow/${flowID}`;
		return axios.put(url, flow);
	}
}
