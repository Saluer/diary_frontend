import { Switch, Route } from "react-router-dom";
import CategoryForm from "../Category/CategoryForm";
import { EEntityTypes } from "../../Helpers/types";

const FlowDispatcher = () => {
	return (
		<Switch>
			<Route path="/category/:categoryID(\d+)/flow/:flowID(\d+)" exact component={FlowInfo} />
			<Route path="/category/:categoryID(\d+)/flow/:action(\w+)" exact render={(props) => <CategoryForm {...props}
				entityType={EEntityTypes.flow} />} />
			<Route path="/category/:categoryID(\d+)/flow/:flowID(\d+)/:action(\w+)" exact render={(props) => <CategoryForm {...props}
				entityType={EEntityTypes.flow} />} />
		</Switch>
	);
};

const FlowInfo = () => {
	return <p>Информация о потоке</p>
};
export default FlowDispatcher;
