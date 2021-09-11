import { Switch, Route } from "react-router-dom";
import FlowForm from "./FlowForm";

const FlowDispatcher = (props: any) => {
	console.log(props);
	return (
		<Switch>
			<Route path="/category/:categoryID(\d+)/flow/:flowID(\d+)" exact component={FlowInfo} />
			<Route path="/category/:categoryID(\d+)/flow/:action" exact component={FlowForm} />
			<Route path="/category/:categoryID(\d+)/flow/:flowID(\d+)/:action" exact component={FlowForm} />
		</Switch>
	);
};

const FlowInfo = () => {
	return <p>Информация о потоке</p>
};
export default FlowDispatcher;
