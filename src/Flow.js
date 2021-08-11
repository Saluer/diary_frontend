import React, { useEffect } from "react";
import FlowService from "./FlowService";

const flowService = new FlowService();

const FlowsTable = () => {
	useEffect(() => {
		flowService.geFlows().then(()=>{});
	}, []);

	return <p>Потоки</p>;
};

const Flow = () => {
	return <p>Поток</p>;
};
export default FlowsTable;
