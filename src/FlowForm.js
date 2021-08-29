import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import FlowService from "./FlowService";
import CategoryService from "./CategoryService";

const categoryService = new CategoryService();
const flowService = new FlowService();

/*! Форма работает корректно для создания и некорректно - для обновления категорий.
Дело в том, что при создании передаётся id надкатегории, а при обновлении - id дочерней категории.
Можно создать два разных компонента, но видно, что их можно объединить в один, поскольку много общих атрибутов и функций.
Однако пока принципиально*/

//? Можно ли задействовать наследование?
const FlowForm = () => {
	return (
		<Switch>
			<Route path="/flow/:id/create" component={FlowCreateForm} />
			<Route path="/flow/:id/update" component={FlowUpdateForm} />
		</Switch>
	);
};

const FlowCreateForm = (props) => {
	const [categoryName, setCategoryName] = useState(
		"Ошибка. У основной категории не может быть потоков!"
	);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const {
		match: { params },
	} = props;
	useEffect(() => {
		categoryService.getCategory(params.id).then((category) => {
			//TODO Ужасный код вместе с импортом CategoryService. Нужно обдумать его замену
			setCategoryName(category.data.name);
			// const flowData = flow.data;
			// setName(flowData.data.name);
			// setDescription(flowData.description);
		});
		return () => {
			setCategoryName("");
			setName("");
			setDescription("");
		};
	}, [params]);

	const handleCreate = () => {
		flowService
			.createFlow(
				{
					category:params.id,
					name: name,
					body: description,
				},
				params.id
			)
			.then(() => {
				alert("Создано");
				props.history.push("/category/" + params.id);
			})
			.catch(() => {
				alert("Вы допустили ошибку при заполнении формы!");
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
				<h2>Создание нового потока</h2>
				<label className="form-label mt-2">Категория:</label>
				<span className="mx-2 font-italic text-info">{categoryName}</span>
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

const FlowUpdateForm = (props) => {
	const [name, setName] = useState("");
	const [categoryName, setCategoryName] = useState(
		"Ошибка. У основной категории не может быть потоков!"
	);
	const [description, setDescription] = useState("");
	const {
		match: { params },
	} = props;

	useEffect(() => {
		if (params && params.id) {
			flowService.getFlow(params.id).then((flow) => {
				console.log(flow);
				if (flow.category_name) setCategoryName(flow.category_name);
				const flowData = flow.data;
				setName(flowData.name);
				setDescription(flowData.description);
			});
		} else params.id = "";
		return () => {
			setName("");
			setDescription("");
			setCategoryName("");
		};
	}, [params]);

	const handleUpdate = (id) => {
		flowService
			.updateFlow({
				name: name,
				body: description,
			}, id)
			.then(() => {
				alert("Flow updated!");
				params.id
					? props.history.push("/flow/" + params.id)
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
				<h2>Редактирование потока</h2>
				<label className="form-label mt-2">Категория:</label>
				<span className="mx-2 font-italic text-info">{categoryName}</span>
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
export default FlowForm;