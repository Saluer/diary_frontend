import { useState, useEffect } from "react";
import CategoryService from "./CategoryService";
import { Switch, Route, Link, useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import FlowsTable from "../Flow/FlowsTable";
// import { ICategoryAPI } from "../types";
const categoryService = new CategoryService();


const CategoryDispatcher = (props: any) => {
	console.log(props);
	return (
		<Switch>
			<Route path="/:action" exact component={CategoryForm} />
			<Route
				path="/category/:categoryID(\d+)/:action"
				exact
				component={CategoryForm}
			/>
			<Route path="/(category)?/:categoryID(\d+)?" exact component={CategoryInfo} />
		</Switch>
	);
};

const CategoryInfo = (props:any) => {
	console.log(props);
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
		upperCategoryName: string;
		name: string;
		description: string;
	}[]>([]);
	const [nextPageURL, setNextPageURL] = useState("");
	const [upperCategoryName, setUpperCategoryName] = useState("");
	const [description, setDescription] = useState("");

	//Функция ниже позволяет не передавать и получать props в списке параметров, что удобно.
	//Вдобавок, не приходится писать длинный код деконструкции
	//Считай, функция берёт данные из роутера, не из параметров
	const { categoryID } = useParams<{ categoryID: string | undefined }>();
	useEffect(() => {
		categoryService.getCategories(categoryID).then((categories) => {
			setCategories(categories.data);
			setNextPageURL(categories.nextLink);
			//? Стоит ли поменять код? Больно тяжело досталось мне получение имени родительской категории
			setUpperCategoryName(categories.upper_category.name);
			setDescription(categories.upper_category.description);
		});
		return () => {
			setCategories([]);
			setNextPageURL("");
			setUpperCategoryName("");
		};
	}, [categoryID]);

	const handleDelete = (id: string) => {
		categoryService.deleteCategory({ categoryID: categoryID }).then(() => {
			const newCategoriesCollection = categories.filter((obj: any) => obj.id !== id);
			setCategories(newCategoriesCollection);
		});
	};

	const nextPage = () => {
		categoryService.getCategoriesByURL(nextPageURL).then((categories) => {
			setCategories(categories.data);
			setNextPageURL(categories.nextLink);
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
					{categories.map((category: any) => (
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
			<Link to={(categoryID ? categoryID : "") + "/create"}>
				<button className="btn btn-primary">Добавить категорию</button>
			</Link>
		</div>
	);
};
export default CategoryDispatcher;