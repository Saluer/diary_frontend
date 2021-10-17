import { CategoryService } from "../CategoryService";
import { FlowsTable } from "../../FlowsTable";
import { CategoryList } from "../CategoryList";

export const categoryService = new CategoryService();

export function CategoryInfo(): JSX.Element {
	return (
		<div>
			<CategoryList />
			<FlowsTable />
		</div>
	);
}

