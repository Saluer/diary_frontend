import axios from "axios";
const API_URL = "http://localhost:8000";

export default class FlowSerivce {
	//!
	async getFlows(categoryID:number) {
		const url = `${API_URL}/api/flows/${categoryID}`;
		const response = await axios.get(url);
		return response.data;
	}
	async getFlow(flowID :number) {
		const url = `${API_URL}/api/flow/${flowID}`;
		const response = await axios.get(url);
		return response.data;
	}
	deleteFlow(flowID:number) {
		const url = `${API_URL}/api/flow/${flowID}`;
		return axios.delete(url);
	}
	createFlow(flow: { category: number; name: string; description: string }) {
		const url = `${API_URL}/api/flow/${flow.category}`;
		return axios.post(url, flow);
	}
	updateFlow(flow: { name: string; description: string }, flowID:number) {
		const url = `${API_URL}/api/flow/${flowID}`;
		return axios.put(url, flow);
	}
}
