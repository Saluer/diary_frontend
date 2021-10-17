import { Switch, Route } from "react-router-dom";
import { CUForm } from "../../CUForm";
import { EEntityTypes } from "../../utils/types";
import { CategoryInfo } from "../CategoryInfo";

export function CategoryDispatcher(): JSX.Element {
	return (
		<Switch>
			<Route path="/:action(\w+)" exact render={(props) => <CUForm {...props} entityType={EEntityTypes.category} />} />
			<Route
				path="/category/:categoryID(\d+)/:action(\w+)"
				exact
				render={(props) => <CUForm {...props} entityType={EEntityTypes.category} />} />
			<Route path="/(category)?/:categoryID(\d+)?" exact component={CategoryInfo} />
		</Switch>
	);
}
