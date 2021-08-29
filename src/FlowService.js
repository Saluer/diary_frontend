import axios from "axios";
const API_URL = "http://localhost:8000";

export default class FlowSerivce{
    async getFlows(categoryId="") {
		const url = `${API_URL}/api/flows/${categoryId}`;
		const response = await axios.get(url);
		return response.data;
	}
	async getFlow(flowId) {
		const url = `${API_URL}/api/flow/${flowId}`;
		const response = await axios.get(url);
		return response.data;
	}
	deleteFlow(flow) {
		const url = `${API_URL}/api/flow/${flow.id}`;
		return axios.delete(url);
	}
	createFlow(flow, categoryId) {
		console.log(flow)
		const url = `${API_URL}/api/flow/${categoryId}`;
		return axios.post(url, flow);
	}
	updateFlow(flow, flowId) {
		console.log(flow)
		const url = `${API_URL}/api/flow/${flowId}`;
		return axios.put(url, flow);
	}
}