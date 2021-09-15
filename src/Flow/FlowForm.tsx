import React, { FormEvent } from "react";
import FlowService from "./FlowService";
import CategoryService from "../Category/CategoryService";
import { IFlowFormState, IParams, EActions } from "../types";
import { RouteComponentProps } from "react-router";
const categoryService = new CategoryService();
const flowService = new FlowService();


const MAIN_CATEGORY = 0;
const NULL_FLOW = 0;
const CATEGORY_NAME_ERROR = "Ошибка"
const CREATION_SUCCESS_MESSAGE = "Вы успешно создали объект"
const CREATION_ERROR_MESSAGE = "Произошла ошибка при создании объекта"
const UPDATE_SUCCESS_MESSAGE = "Вы успешно обновили объект"
const UPDATE_ERROR_MESSAGE = "Произошла ошибка при обновлении объекта"

class FlowForm extends React.Component<RouteComponentProps<IParams>, IFlowFormState>  {
	private params: IParams;
	private L_flowID: number = NULL_FLOW;
	private L_categoryID: number = MAIN_CATEGORY;
	constructor(props: RouteComponentProps<IParams>) {
		super(props);
		this.state = {
			categoryName: CATEGORY_NAME_ERROR,
			name: "",
			description: "",
		};
		this.params = this.props.match.params;
		if (this.params.flowID)
			this.L_flowID = parseInt(this.params.flowID);
		if (this.params.categoryID)
			this.L_categoryID = parseInt(this.params.categoryID);
	}


	componentDidMount() {
		if (this.params.action === EActions.create) {
			categoryService.getCategory(this.L_categoryID).then((category: {
				//TODO Подумать, почему указываю в типе одно, а возвращает промис — другое (почему-то добавляется id)
				//TODO В целом рассмотреть тип ниже и с ним связанное
				data: {
					name: string;
					description: string;
				},
				upper_category_name: string;
			}) => {
				//TODO Ужасный код вместе с импортом CategoryService. Нужно обдумать его замену
				this.setState({ categoryName: category.data.name });
			});
		}
		else if (this.params.action === EActions.update)
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
					categoryID: this.L_categoryID,
					name: this.state.name,
					description: this.state.description,
				}
			)
			.then(() => {
				alert(CREATION_SUCCESS_MESSAGE);
				this.props.history.push("/category/" + this.params.categoryID);
			})
			.catch(() => {
				alert(CREATION_ERROR_MESSAGE);
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
				alert(UPDATE_SUCCESS_MESSAGE);
				this.props.history.push("/category/" + this.params.categoryID + "/flow/" + this.L_flowID);
			})
			.catch(() => {
				alert(UPDATE_ERROR_MESSAGE);
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
