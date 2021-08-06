import React, { useState, useEffect } from "react";
import CategoryService from "./CategoryService";
import { Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import CategoryCreateUpdateForm from "./CategoryCreateUpdateForm";

const categoryService = new CategoryService();

const Category = () => {
	return (
		<Switch>
			<Route path="/" exact component={CategoryList} />
			<Route path="/category/:id" exact component={CategoryList} />
			<Route path="/form"  exact component={CategoryCreateUpdateForm} />
			<Route
				path="/category/:id/form"
				exact
				component={CategoryCreateUpdateForm}
			/>
		</Switch>
	);
};

const CategoryList = (props) => {
	const [categories, setCategories] = useState([]);
	const [nextPageURL, setNextPageURL] = useState("");
	const [upperCategoryName, setUpperCategoryName] = useState("");
	//? Нужно ли?
	const match = useRouteMatch();
    console.log("🚀 ~ file: Category.js ~ line 28 ~ CategoryList ~ match", match)
	const { id } = useParams();
	
	useEffect(() => {
		categoryService.getCategories(id).then(function (result) {
			setCategories(result.data);
			setNextPageURL(result.nextLink);
			//? Стоит ли поменять код? Больно тяжело досталось мне получение имени родительской категории
			setUpperCategoryName(result.upper_category.name);
		});
		return(()=>{
			setCategories([]);
			setNextPageURL("");
			setUpperCategoryName("");
		})
	}, [match, id]);
	
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
			<table className="table">
				<thead key="thead">
					<tr>
						<th>ID</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((c) => (
						<tr key={c.id}>
							<td>{c.id} </td>
							<td>{c.name}</td>
							<td>
								<Link
									to={{
										pathname: "/category/" + c.id,
									}}
								>
									<button className="btn btn-primary">
										Перейти в категорию
									</button>
								</Link>
							</td>
							<td>
								<button onClick={(e) => handleDelete(e, c.id)}>Delete</button>
								{
									//TODO Позже решу, какой путь будет у Update, чтобы не пересекалось с переходом в категорию
									//? Может, через параметр указать способ? Как method=update?
								}
								{/* <a href={"/category/" + c.id}> Update</a> */}
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
				<Link to={id + "/form"}>
					<button className="btn btn-primary" onClick={nextPage}>
						Добавить категорию
					</button>
				</Link>
			) : (
				<Link to={"/form"}>
					<button className="btn btn-primary" onClick={nextPage}>
						Добавить категорию
					</button>
				</Link>
			)}
		</div>
	);
};
export default Category;
