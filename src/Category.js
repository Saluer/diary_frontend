import React, { useState, useEffect } from "react";

import CategoryService from "./CategoryService";
import { Link } from "react-router-dom";
const categoryService = new CategoryService();

const Category = (props) => {
	console.log(
		"🚀 ~ file: CategoriesList.js ~ line 8 ~ Category ~ props",
		props
	);
	const [categories, setCategories] = useState([]);
	const [nextPageURL, setNextPageURL] = useState("");
	const id = props.match.params.id;
	useEffect(() => {
		categoryService
			.getCategories(id)
			.then(function (result) {
				setCategories(result.data);
				setNextPageURL(result.nextLink);
				console.log(result.nextLink)
			});
	}, [id]);

	const handleDelete = (e, id) => {
		categoryService.deleteCategory({ id: id }).then(() => {
			var newArr = categories.filter(function (obj) {
				return obj.id !== id;
			});

			setCategories({ categories: newArr });
		});
	};

	const nextPage = () => {
		categoryService.getCategoriesByURL(nextPageURL).then((result) => {
            console.log("🚀 ~ file: Category.js ~ line 36 ~ categoryService.getCategoriesByURL ~ nextPageURL", nextPageURL)
            console.log("🚀 ~ file: Category.js ~ line 36 ~ categoryService.getCategoriesByURL ~ result", result)
			setCategories(result.data);
			setNextPageURL(result.nextLink);
		});
	};

	return (
		<div className="categories--list">
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
								<Link to={"/category/" + c.id}>
									<button className="btn btn-primary" >
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
			{
				<button className="btn btn-primary" onClick={nextPage}>
					Next
				</button>
			}
		</div>
	);
};
export default Category;
