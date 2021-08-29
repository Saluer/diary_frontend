import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import CategoryService from "./CategoryService";

const categoryService = new CategoryService();

/*! Форма работает корректно для создания и некорректно - для обновления категорий.
Дело в том, что при создании передаётся id надкатегории, а при обновлении - id дочерней категории.
Можно создать два разных компонента, но видно, что их можно объединить в один, поскольку много общих атрибутов и функций.
Однако пока принципиально*/

//? Можно ли задействовать наследование?
const CategoryForm = () => {
	return (
		<Switch>
			<Route path="/create" component={CategoryCreateForm} />
			<Route path="/category/:id/create" component={CategoryCreateForm} />
			<Route path="/category/:id/update" component={CategoryUpdateForm} />
		</Switch>
	);
};

const CategoryCreateForm = (props) => {
	const [name, setName] = useState("");
	const [upperCategoryName, setUpperCategoryName] =
		useState("Основная категория");
	const [description, setDescription] = useState("");
	const {
		match: { params },
	} = props;
	useEffect(() => {
		if (params && params.id) {
			categoryService.getCategories(params.id).then((category) => {
				setUpperCategoryName(category.upper_category.name);
				setName(category.name);
				setDescription(category.description);
			});
		} else params.id = "";
		return () => {
			setName("");
			setDescription("");
			setUpperCategoryName("");
		};
	}, [params]);

	const handleCreate = () => {
		console.log(params.id, name);
		categoryService
			.createCategory(
				{	
					upperCategoryId:params.id,
					category_name: name,
					category_description: description,
				},
			)
			.then(() => {
				alert("Создано");
				params.id
					? props.history.push("/category/" + params.id)
					: props.history.push("/");
			})
			.catch(() => {
				alert("There was an error! Please re-check your form.");
			});
	};

	const handleSubmit = (event) => {
		handleCreate();

		event.preventDefault();
	};

	//? Можно ли как-то оптимизировать следующие две функции? Может, сделать компонент классовым?
	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<h2>Создание новой категории</h2>
				<label className="form-label mt-2">Надкатегория:</label>
				<span className="mx-2 font-italic text-info">{upperCategoryName}</span>
				<br />
				<label className="mt-2">Название:</label>
				<input
					className="form-control w-25 mb-2"
					type="text"
					value={name || ""}
					onChange={handleNameChange}
				/>
				<label>Описание:</label>
				<input
					className="form-control w-50"
					type="text"
					value={description || ""}
					onChange={handleDescriptionChange}
				/>
				<input className="btn btn-primary mt-2" type="submit" value="Submit" />
			</div>
		</form>
	);
};

const CategoryUpdateForm = (props) => {
	const [name, setName] = useState("");
	const [upperCategoryName, setUpperCategoryName] =
		useState("Основная категория");
	const [description, setDescription] = useState("");
	const {
		match: { params },
	} = props;

	useEffect(() => {
		if (params && params.id) {
			categoryService.getCategory({id:params.id}).then((category) => {
				if (category.upper_category_name)
					setUpperCategoryName(category.upper_category_name);
				const categoryData = category.data;
				setName(categoryData.name);
				setDescription(categoryData.description);
			});
		} else params.id = "";
		return () => {
			setName("");
			setDescription("");
			setUpperCategoryName("");
		};
	}, [params]);

	const handleUpdate = (id) => {
		categoryService
			.updateCategory({
				id: id,
				category_name: name,
				category_description: description,
			})
			.then(() => {
				alert("Category updated!");
				params.id
					? props.history.push("/category/" + params.id)
					: props.history.push("/");
			})
			.catch(() => {
				alert("Вы допустили ошибку при заполнении формы!");
			});
	};

	const handleSubmit = (event) => {
		handleUpdate(params.id);
		event.preventDefault();
	};

	//? Можно ли как-то оптимизировать следующие две функции? Может, сделать компонент классовым?
	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<h2>Редактирование категории</h2>
				<label className="form-label mt-2">Надкатегория:</label>
				<span className="mx-2 font-italic text-info">{upperCategoryName}</span>
				<br />
				<label className="mt-2">Название:</label>
				<input
					className="form-control w-25 mb-2"
					type="text"
					value={name || ""}
					onChange={handleNameChange}
				/>
				<label>Описание:</label>
				<input
					className="form-control w-50"
					type="text"
					value={description || ""}
					onChange={handleDescriptionChange}
				/>
				<input className="btn btn-primary mt-2" type="submit" value="Submit" />
			</div>
		</form>
	);
};
export default CategoryForm;
