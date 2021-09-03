import {Switch, Route } from "react-router-dom";
import FlowForm from "./FlowForm";

const FlowDispatcher = () => {
	return (
		<Switch>
			<Route path="/flow/:id" exact component={FlowInfo} />
			<Route path="/flow/:id/:action" exact component={FlowForm} />
		</Switch>
	);
};

const FlowInfo = () => {
	return "Информация о потоке";
};
export default FlowDispatcher;
