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

class FlowCreateForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryName: "Ошибка. У основной категории не может быть потоков!",
			name: "",
			description: "",
		};
	}

	componentDidMount() {
		const {
			match: { params },
		} = this.props;
		categoryService.getCategory({ id: params.id }).then((category) => {
			//TODO Ужасный код вместе с импортом CategoryService. Нужно обдумать его замену
			this.setState({ abc: category.data.name });
		});
	}

	handleCreate = () => {
		const {
			match: { params },
		} = this.props;
		flowService
			.createFlow(
				{
					category: params.id,
					name: this.state.name,
					body: this.state.description,
				},
				params.id
			)
			.then(() => {
				alert("Создано");
				this.props.history.push("/category/" + params.id);
			})
			.catch(() => {
				alert("Вы допустили ошибку при заполнении формы!");
			});
	};

	handleSubmit = (event) => {
		this.handleCreate();
		event.preventDefault();
	};

	//? Можно ли как-то оптимизировать следующие две функции? Может, сделать компонент классовым?
	// handleNameChange = (event) => {
	// 	this.setState({ name: event.target.value });
	// };

	// handleDescriptionChange = (event) => {
	// 	this.setState({ description: event.target.value });
	// };

	handleChange=(event)=>{
		this.setState({[event.target.name]:event.target.value})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<h2>Создание нового потока</h2>
					<label className="form-label mt-2">Категория:</label>
					<span className="mx-2 font-italic text-info">
						{this.state.categoryName}
					</span>
					<br />
					<label className="mt-2">Название:</label>
					<input
						name="name"
						className="form-control w-25 mb-2"
						type="text"
						value={this.state.name || ""}
						onChange={this.handleChange}
					/>
					<label>Описание:</label>
					<input
						name="description"
						className="form-control w-50"
						type="text"
						value={this.state.description || ""}
						onChange={this.handleChange}
					/>
					<input
						className="btn btn-primary mt-2"
						type="submit"
						value="Submit"
					/>
				</div>
			</form>
		);
	}
}

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
		flowService.getFlow({ id: params.id }).then((flow) => {
			if (flow.category_name) setCategoryName(flow.category_name);
			const flowData = flow.data;
			setName(flowData.name);
			setDescription(flowData.body);
		});

		return () => {
			setName("");
			setDescription("");
			setCategoryName("");
		};
	}, [params]);

	const handleUpdate = (id) => {
		flowService
			.updateFlow({ id: id, name: name, body: description })
			.then(() => {
				alert("Flow updated!");
				props.history.push("/flow/" + params.id);
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
