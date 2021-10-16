import axios from "axios";
import {
	ICreateUpdateFlow,
	IGetFlow,
	IGetFlowsList,
} from "../../Helpers/types";
const API_URL = "http://localhost:8000";

export default class FlowSerivce {
	async getFlows(categoryID: number) {
		const url = `${API_URL}/api/flows/${categoryID}`;
		const response = await axios.get<IGetFlowsList>(url);
		return response.data;
	}
	async getFlow(flowID: number) {
		const url = `${API_URL}/api/flow/${flowID}`;
		const response = await axios.get<IGetFlow>(url);
		return response.data;
	}
	deleteFlow(flowID: number) {
		const url = `${API_URL}/api/flow/${flowID}`;
		return axios.delete<void>(url);
	}
	createFlow(flow: ICreateUpdateFlow) {
		const url = `${API_URL}/api/flow/${flow.categoryID}`;
		return axios.post<void>(url, flow);
	}
	updateFlow(flow: ICreateUpdateFlow) {
		const url = `${API_URL}/api/flow/${flow.id}`;
		return axios.put<void>(url, flow);
	}
}
