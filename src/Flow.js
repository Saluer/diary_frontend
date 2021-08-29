import {Switch, Route } from "react-router-dom";
import FlowForm from "./FlowForm";

const FlowDispatcher = () => {
	return (
		<Switch>
			<Route path="/flow/:id" exact component={FlowInfo} />
			<Route path="/(flow)?/:id?/create" exact component={FlowForm} />
			<Route path="/(flow)?/:id/update" exact component={FlowForm} />
		</Switch>
	);
};

const FlowInfo = () => {
	return "Информация о потоке";
};
export default FlowDispatcher;
