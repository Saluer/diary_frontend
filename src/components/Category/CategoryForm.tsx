import React, { FormEvent } from "react";
import { RouteComponentProps } from "react-router";
import {
	IParams,
	ICategoryFormState,
	ICreateUpdateCategory,
	EEntityTypes,
	ICreateUpdateFlow,
} from "../../Helpers/types";
import { Input } from "../../Helpers/Inputs";

import { CategoryFormActions, FlowFormActions } from "../../FormActions";
import {
	MAIN_CATEGORY_TITLE,
	MAIN_CATEGORY,
	NULL_FLOW,
} from "../../Helpers/constants";

//Создаётся объект и передаётся необходимый для дальнейших действий набор данных.
//! Пока под вопросом такой способ
const getFormActionsObject = (type = EEntityTypes.category, data: any) => {
	if (type === EEntityTypes.category) {
		return new CategoryFormActions(data);
	} else {
		return new FlowFormActions(data);
	}
};

class CategoryForm extends React.Component<
	RouteComponentProps<IParams> & { entityType: EEntityTypes },
	ICategoryFormState
> {
	private formActions;
	private params: IParams = {};
	private L_flowID: number = NULL_FLOW;
	private L_categoryID: number = MAIN_CATEGORY;
	private title = "";
	private data = {};
	//Создаём объект с функциями, который для каждого вида формы имеет свои реализации функций
	constructor(
		props: RouteComponentProps<IParams> & { entityType: EEntityTypes }
	) {
		super(props);
		this.state = {
			containerName: MAIN_CATEGORY_TITLE,
			name: "",
			description: "",
		};
		this.params = this.props.match.params;
		if (this.params.flowID) this.L_flowID = parseInt(this.params.flowID);
		if (this.params.categoryID)
			this.L_categoryID = parseInt(this.params.categoryID);

		switch (props.entityType) {
			case EEntityTypes.flow:
				this.data = { categoryID: this.L_categoryID, flowID: this.L_flowID };
				this.title = "Поток";
				break;
			case EEntityTypes.category:
				console.log(this.L_categoryID);
				this.data = { categoryID: this.L_categoryID };
				this.title = "Категория";
				break;
			default:
				alert("Ошибка!");
				break;
		}
		this.formActions = getFormActionsObject(this.props.entityType, this.data);
	}

	componentDidMount() {
		//В зависимости от истинности условий выполняем нужный код объекта с функциями
		//Однако чтобы передать ему управление состоянием, нужно передать функцию в колбэк
		//Либо же, если есть Redux, то он сам изменит состояние компонента
		if (this.L_categoryID) {
			this.formActions.initialize(
				this.params.action,
				(value: any) => {
					this.setState(value);
				},
				{categoryID:this.L_categoryID, flowID:this.L_flowID}
			);
		}
	}

	private handleSubmit = (
		event: FormEvent,
		submitType: string,
	) => {
		//TODO передать submitType, тип объекта и formData в объект с действиями
		//TODO в зависимости от типа объекта и действия, он сам вызовет нужный метод
		const callbackFunction = this.props.history.push;
		//! Бардак
		let formData: any = {};
		if (this.props.entityType === EEntityTypes.category) {
			formData = {
				id: this.L_categoryID,
				upperCategoryID: this.L_categoryID,
				name: this.state.name,
				description: this.state.description,
			}
		}
		else {
			formData = {
				id: this.L_flowID,
				categoryID: this.L_categoryID,
				name: this.state.name,
				description: this.state.description,
			}
		}
		this.formActions.handleSubmit(submitType, formData, callbackFunction);
		event.preventDefault();
	};

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ ...this.state, [event.target.name]: event.target.value });
	};

	render() {
		return (
			<form
				onSubmit={(event) =>
					this.handleSubmit(event, this.params.action!)
				}
			>
				<div className="form-group">
					<h2>{this.title}</h2>
					<label className="form-label mt-2">Надкатегория:</label>
					<span className="mx-2 font-italic text-info">
						{this.state.containerName}
					</span>
					<br />
					<Input
						labelText="Название"
						type="text"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<Input
						labelText="Описание"
						type="text"
						name="description"
						value={this.state.description}
						onChange={this.handleChange}
					/>
					<Input type="submit" name="submit" value="Submit" />
				</div>
			</form>
		);
	}
}
export default CategoryForm;
