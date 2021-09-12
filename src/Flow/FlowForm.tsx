import React, { FormEvent } from "react";
import FlowService from "./FlowService";
import CategoryService from "../Category/CategoryService";
import { IFlowFormState, IParams } from "../types";
import { RouteComponentProps } from "react-router";
const categoryService = new CategoryService();
const flowService = new FlowService();


class FlowForm extends React.Component<RouteComponentProps<IParams>, IFlowFormState>  {
	private params: IParams;
	private L_flowID: number = 0;
	constructor(props: RouteComponentProps<IParams>) {
		super(props);
		this.state = {
			categoryName: "Ошибка",
			name: "",
			description: "",
		};
		this.params = this.props.match.params;
		if (this.params.flowID)
			this.L_flowID = parseInt(this.params.flowID);
	}


	componentDidMount() {
		console.log(this.params);
		if (this.params.action === "create") {
			categoryService.getCategory(this.L_flowID).then((category) => {
				//TODO Ужасный код вместе с импортом CategoryService. Нужно обдумать его замену
				this.setState({ categoryName: category.data.name });
			});
		}
		else if (this.params.action === "update")
			flowService.getFlow(this.L_flowID).then((flow) => {
				if (flow.category_name)
					this.setState({ categoryName: flow.category_name });
				const flowData = flow.data;
				this.setState({ name: flowData.name, description: flowData.description });
			});
	}

	handleCreate = (event: FormEvent) => {
		flowService
			.createFlow(
				{
					category: this.L_flowID,
					name: this.state.name,
					description: this.state.description,
				}
			)
			.then(() => {
				alert("Создано");
				this.props.history.push("/category/" + this.params.categoryID);
			})
			.catch(() => {
				alert("Вы допустили ошибку при заполнении формы!");
			});
		event.preventDefault();
	};

	handleUpdate = (event: FormEvent) => {
		flowService
			.updateFlow({
				name: this.state.name,
				description: this.state.description,
			}, this.L_flowID)
			.then(() => {
				alert("Flow updated!");
				this.props.history.push("/category/" + this.params.categoryID + "/flow/" + this.L_flowID);
			})
			.catch(() => {
				alert("Вы допустили ошибку при заполнении формы!");
			});
		event.preventDefault();
	};

	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ ...this.state, [event.target.name]: event.target.value });
	};

	render() {
		if (this.params.action === "create")
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
		else if (this.params.action === "update")
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
