import React from "react";
import FlowService from "./FlowService";
import CategoryService from "./CategoryService";

const categoryService = new CategoryService();
const flowService = new FlowService();


class FlowForm extends React.Component {
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
		if (params.action === "create")
			categoryService.getCategory({ id: params.id }).then((category) => {
				//TODO Ужасный код вместе с импортом CategoryService. Нужно обдумать его замену
				this.setState({ categoryName: category.data.name });
			});
		else if (params.action === "update")
			flowService.getFlow({ id: params.id }).then((flow) => {
				if (flow.category_name)
					this.setState({ categoryName: flow.category_name });
				const flowData = flow.data;
				this.setState({ name: flowData.name, description: flowData.body });
			});
	}

	handleCreate = (event) => {
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
		event.preventDefault();
	};

	handleUpdate = (event) => {
		const {
			match: { params },
		} = this.props;
		flowService
			.updateFlow({
				id: params.id,
				name: this.state.name,
				body: this.state.description,
			})
			.then(() => {
				alert("Flow updated!");
				this.props.history.push("/flow/" + params.id);
			})
			.catch(() => {
				alert("Вы допустили ошибку при заполнении формы!");
			});
		event.preventDefault();
	};

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const {
			match: { params },
		} = this.props;

		if (params.action === "create")
			return (
				<form onSubmit={this.handleCreate}>
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
		else if (params.action === "update")
			return (
				<form onSubmit={this.handleUpdate}>
					<div className="form-group">
						<h2>Редактирование потока</h2>
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

export default FlowForm;
