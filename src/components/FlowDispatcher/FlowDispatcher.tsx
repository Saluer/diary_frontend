import { Switch, Route } from "react-router-dom";
import { CUForm } from "../CUForm";
import { EEntityTypes } from "../utils/types";
import { FlowInfo } from "../FlowInfo";

export function FlowDispatcher(): JSX.Element {
	return (
		<Switch>
			<Route path="/category/:categoryID(\d+)/flow/:flowID(\d+)" exact component={FlowInfo} />
			<Route path="/category/:categoryID(\d+)/flow/:action(\w+)" exact render={(props) => <CUForm {...props}
				entityType={EEntityTypes.flow} />} />
			<Route path="/category/:categoryID(\d+)/flow/:flowID(\d+)/:action(\w+)" exact render={(props) => <CUForm {...props}
				entityType={EEntityTypes.flow} />} />
		</Switch>
	);
}
