import { useState, useEffect } from "react";
import CategoryService from "./CategoryService";
import { Switch, Route, Link, useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import FlowsTable from "../Flow/FlowsTable";
const categoryService = new CategoryService();


const CategoryDispatcher = () => {
	return (
		<Switch>
			<Route path="/:action(\w+)" exact component={CategoryForm} />
			<Route
				path="/category/:categoryID(\d+)/:action(\w+)"
				exact
				component={CategoryForm}
			/>
			<Route path="/(category)?/:categoryID(\d+)?" exact component={CategoryInfo} />
		</Switch>
	);
};

const CategoryInfo = () => {
	return (
		<div>
			<CategoryList />
			<FlowsTable />
		</div>
	);
};

const CategoryList = () => {
	const [categories, setCategories] = useState<{
		id: number;
		name: string;
		description: string;
	}[]>([]);
	const [nextPageURL, setNextPageURL] = useState("");
	const [upperCategoryName, setUpperCategoryName] = useState("");
	const [description, setDescription] = useState("");

	//Функция ниже позволяет не передавать и получать props в списке параметров, что удобно.
	//Вдобавок, не приходится писать длинный код деконструкции
	//Считай, функция берёт данные из роутера, не из параметров
	const { categoryID } = useParams<{ categoryID?: string }>();
	let L_categoryID = 0;
	if (categoryID)
		L_categoryID = parseInt(categoryID);
	useEffect(() => {
		categoryService.getCategories(L_categoryID).then((response: {
			categories_data: {
				id: number;
				name: string;
				description: string;
			}[],
			nextLink: string,
			upper_category_data: { name: string, description: string }
		}) => {
			setCategories(response.categories_data);
			setNextPageURL(response.nextLink);
			//? Стоит ли поменять код? Больно тяжело досталось мне получение имени родительской категории
			setUpperCategoryName(response.upper_category_data.name);
			setDescription(response.upper_category_data.description);
		});
		return () => {
			setCategories([]);
			setNextPageURL("");
			setUpperCategoryName("");
		};
	}, [L_categoryID]);

	const handleDelete = (id: number) => {
		categoryService.deleteCategory(id).then(() => {
			const newCategoriesCollection = categories.filter((category: { id: number }) => category.id !== id);
			setCategories(newCategoriesCollection);
		});
	};

	const nextPage = () => {
		categoryService.getCategoriesByURL(nextPageURL).then((response) => {
			setCategories(response.categories_data);
			setNextPageURL(response.nextLink);
		});
	};

	return (
		<div className="categories--list">
			<h2>{upperCategoryName}</h2>
			<h4>{description}</h4>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((category: { id: number, name: string, description: string }) => (
						<tr key={category.id}>
							<td>{category.id} </td>
							<td>{category.name}</td>
							<td>{category.description}</td>
							<td>
								<Link
									to={{
										pathname: "/category/" + category.id,
									}}
								>
									<button className="btn btn-primary mr-2">
										Перейти в категорию
									</button>
								</Link>
								<Link
									to={{
										pathname: "/category/" + category.id + "/update",
									}}
								>
									<button className="btn btn-info">
										Редактировать категорию
									</button>
								</Link>
							</td>
							<td>
								<button onClick={() => handleDelete(category.id!)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button className="btn btn-secondary mr-3" onClick={nextPage}>
				Next
			</button>
			<Link to={(L_categoryID ? L_categoryID : "") + "/create"}>
				<button className="btn btn-primary">Добавить категорию</button>
			</Link>
		</div>
	);
};
export default CategoryDispatcher;
