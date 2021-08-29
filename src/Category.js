import React, { useState, useEffect } from "react";
import CategoryService from "./CategoryService";
import { Switch, Route, Link, useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";
import FlowsTable from "./FlowsTable";

const categoryService = new CategoryService();

const CategoryDispatcher = () => {
	return (
		<Switch>
			<Route path="/(category)?/:id?/create" exact component={CategoryForm} />
			<Route path="/(category)?/:id/update" exact component={CategoryForm} />
			<Route path="/(category)?/:id?" exact component={CategoryInfo} />
		</Switch>
	);
};

const CategoryInfo = (props) => {
	return (
		<div>
			<CategoryList props={props} />
			<FlowsTable props={props} />
		</div>
	);
};

const CategoryList = () => {
	const [categories, setCategories] = useState([]);
	const [nextPageURL, setNextPageURL] = useState("");
	const [upperCategoryName, setUpperCategoryName] = useState("");
	const [description, setDescription] = useState("");

	//? Может, стоит поменять на вариант без использования этой функции?
	const { id } = useParams();

	useEffect(() => {
		categoryService.getCategories(id).then(function (result) {
			setCategories(result.data);
			setNextPageURL(result.nextLink);
			//? Стоит ли поменять код? Больно тяжело досталось мне получение имени родительской категории
			setUpperCategoryName(result.upper_category.name);
			setDescription(result.upper_category.description);
		});
		return () => {
			setCategories([]);
			setNextPageURL("");
			setUpperCategoryName("");
		};
	}, [id]);

	const handleDelete = (e, id) => {
		categoryService.deleteCategory({ id: id }).then(() => {
			var newArr = categories.filter(function (obj) {
				return obj.id !== id;
			});
			setCategories(newArr);
		});
	};

	const nextPage = () => {
		categoryService.getCategoriesByURL(nextPageURL).then((result) => {
			setCategories(result.data);
			setNextPageURL(result.nextLink);
		});
	};

	return (
		<div className="categories--list">
			<h2>{upperCategoryName}</h2>
			<h4>{description}</h4>
			<table className="table">
				<thead key="thead">
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((c) => (
						<tr key={c.id}>
							<td>{c.id} </td>
							<td>{c.name}</td>
							<td>{c.description}</td>
							<td>
								<Link
									to={{
										pathname: "/category/" + c.id,
									}}
								>
									<button className="btn btn-primary mr-2">
										Перейти в категорию
									</button>
								</Link>
								<Link
									to={{
										pathname: "/category/" + c.id + "/update",
									}}
								>
									<button className="btn btn-info">
										Редактировать категорию
									</button>
								</Link>
							</td>
							<td>
								<button onClick={(e) => handleDelete(e, c.id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button className="btn btn-secondary mr-3" onClick={nextPage}>
				Next
			</button>
			{
				//TODO Подумать над улучшением кода
			}
			{id ? (
				<Link to={id + "/create"}>
					<button className="btn btn-primary" onClick={nextPage}>
						Добавить категорию
					</button>
				</Link>
			) : (
				<Link to={"/create"}>
					<button className="btn btn-primary" onClick={nextPage}>
						Добавить категорию
					</button>
				</Link>
			)}
		</div>
	);
};
export default CategoryDispatcher;
