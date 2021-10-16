import axios from "axios";
const API_URL = "http://localhost:8000";


export default class FlowSerivce {
	async getFlows(categoryID:number) {
		const url = `${API_URL}/api/flows/${categoryID}`;
		const response = await axios.get<IGetFlowsList>(url);
		return response.data;
	}
	async getFlow(flowID :number) {
		const url = `${API_URL}/api/flow/${flowID}`;
		const response = await axios.get<IGetFlow>(url);
		return response.data;
	}
	deleteFlow(flowID:number) {
		const url = `${API_URL}/api/flow/${flowID}`;
		return axios.delete<void>(url);
	}
	createFlow(flow: ICreateUpdateFlow) {
		const url = `${API_URL}/api/flow/${flow.categoryID}`;
		return axios.post<void>(url, flow);
	}
	updateFlow(flow: ICreateUpdateFlow, flowID:number) {
		const url = `${API_URL}/api/flow/${flowID}`;
		return axios.put<void>(url, flow);
	}
}

interface IGetFlowsList{
	flows_data: {
		id: number;
		name: string;
		description: string;
	}[];
	nextLink: string;
}

interface ICreateUpdateFlow {
	id?: number;
	categoryID?: number;
	name: string;
	description: string;
}

interface IGetFlow {
	data: {
		name: string;
		description: string;
	};
	category_name:string;
}
