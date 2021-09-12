import { Switch, Route } from "react-router-dom";
import FlowForm from "./FlowForm";

const FlowDispatcher = () => {
	return (
		<Switch>
			<Route path="/category/:categoryID(\d+)/flow/:flowID(\d+)" exact component={FlowInfo} />
			<Route path="/category/:categoryID(\d+)/flow/:action(\w+)" exact component={FlowForm} />
			<Route path="/category/:categoryID(\d+)/flow/:flowID(\d+)/:action(\w+)" exact component={FlowForm} />
		</Switch>
	);
};

const FlowInfo = () => {
	return <p>Информация о потоке</p>
};
export default FlowDispatcher;
