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
			<Route path="/update" component={CategoryUpdateForm} />
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
			categoryService.getCategories(params.id).then((c) => {
				console.log(c);
				setUpperCategoryName(c.upper_category.name);
				setName(c.name);
				setDescription(c.description);
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
					category_name: name,
					category_description: description,
				},
				params.id
			)
			.then((result) => {
				alert(result);
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
	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
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
					value={name}
					onChange={handleNameChange}
				/>
				<label>Описание:</label>
				<input
					className="form-control w-50"
					type="text"
					value={description}
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
			categoryService.getCategory(params.id).then((c) => {
				console.log(c);
				const {data} = c;
				if(c.upper_category_name)
					setUpperCategoryName(c.upper_category_name);
				setName(data.name);
				setDescription(data.description);
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
				category_id: id,
				category_name: name,
				category_description: description,
			})
			.then((result) => {
				alert("Category updated!");
			})
			.catch(() => {
				alert("There was an error! Please re-check your form.");
			});
	};

	const handleSubmit = (event) => {
		handleUpdate();

		event.preventDefault();
	};

	//? Можно ли как-то оптимизировать следующие две функции? Может, сделать компонент классовым?
	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
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
					value={name}
					onChange={handleNameChange}
				/>
				<label>Описание:</label>
				<input
					className="form-control w-50"
					type="text"
					value={description}
					onChange={handleDescriptionChange}
				/>
				<input className="btn btn-primary mt-2" type="submit" value="Submit" />
			</div>
		</form>
	);
};
export default CategoryForm;
