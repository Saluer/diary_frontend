import { Switch, Route } from "react-router-dom";
import FlowForm from "./FlowForm";

const FlowDispatcher = (props: any) => {
	console.log(props);
	return (
		<Switch>
			<Route path="/category/:categoryID/flow/:flow/:action" exact component={FlowForm} />
			<Route path="/category/:categoryID/flow/:flowID" exact component={FlowInfo} />
		</Switch>
	);
};

const FlowInfo = () => {
	return <p>Информация о потоке</p>
};
export default FlowDispatcher;
