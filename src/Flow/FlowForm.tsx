import React, { FormEvent } from "react";
import FlowService from "./FlowService";
import CategoryService from "../Category/CategoryService";
import { IFlowFormState, IParams, EActions } from "../types";
import { RouteComponentProps } from "react-router";
import { Input } from "../Helpers/Inputs";
import { CATEGORY_NAME_ERROR, CREATION_ERROR_MESSAGE, CREATION_SUCCESS_MESSAGE, MAIN_CATEGORY, NULL_FLOW, UPDATE_ERROR_MESSAGE, UPDATE_SUCCESS_MESSAGE } from "../Helpers/constants";
const categoryService = new CategoryService();
const flowService = new FlowService();


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
		return (
			<form onSubmit={this.params.action === "create" ? this.handleCreate : this.handleUpdate}>
				<div className="form-group">
					<h2>Создание нового потока</h2>
					<label className="form-label mt-2">Категория:</label>
					<span className="mx-2 font-italic text-info">
						{this.state.categoryName}
					</span>
					<br />
					<Input labelText="Название" type="text" name="name"
						value={this.state.name} onChange={this.handleChange} />
					<Input labelText="Описание" type="text" name="description"
						value={this.state.description} onChange={this.handleChange} />
					<Input type="submit" name="submit"
						value="Submit" />
				</div>
			</form>
		)
	}
}

export default FlowForm;
