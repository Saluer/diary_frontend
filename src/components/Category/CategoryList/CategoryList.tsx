import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MAIN_CATEGORY } from "../../utils/constants";
import { CategoryService } from "../CategoryService";

export const categoryService = new CategoryService();

export function CategoryList(): JSX.Element {
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
	const { categoryID } = useParams<{ categoryID?: string; }>();
	let L_categoryID = MAIN_CATEGORY;
	if (categoryID)
		L_categoryID = parseInt(categoryID);

	useEffect(() => {
		categoryService.getCategories(L_categoryID).then((response: any) => {
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
			const newCategoriesCollection = categories.filter((category: { id: number; }) => category.id !== id);
			setCategories(newCategoriesCollection);
		});
	};

	const nextPage = () => {
		categoryService.getCategoriesByURL(nextPageURL).then((response: any) => {
			setCategories(response.categories_data);
			setNextPageURL(response.nextLink);
		});
	};

	return (
		<div className="categories-list">
			<h2>Название категории: {upperCategoryName}</h2>
			<h4>Описание категории: {description}</h4>
			<table className="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((category: { id: number; name: string; description: string; }) => (
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
			<Link to={(L_categoryID !== MAIN_CATEGORY ? L_categoryID : "") + "/create"}>
				<button className="btn btn-primary">Добавить категорию</button>
			</Link>
		</div>
	);
}
