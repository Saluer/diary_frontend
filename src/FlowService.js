import axios from "axios";
const API_URL = "http://localhost:8000";

export default class FlowSerivce{
    geFlows(categoryID="") {
		const url = `${API_URL}/api/flows/${categoryID}`;
		return axios.get(url).then((response) => response.data);
	}
}