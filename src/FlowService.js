import axios from "axios";
const API_URL = "http://localhost:8000";

export default class FlowSerivce{
    async getFlows(categoryID="") {
		const url = `${API_URL}/api/flows/${categoryID}`;
		const response = await axios.get(url);
		return response.data;
	}
}