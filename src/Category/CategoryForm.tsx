import React, { FormEvent } from "react";
import { RouteComponentProps } from "react-router";
import { IParams, ICategoryFormState, ICreateUpdateCategory, EEntityTypes } from "../types";
import { Input } from "../Helpers/Inputs";

import { CategoryFormActions, FlowFormActions } from "./CategoryFormActions";
import { CATEGORY_NAME_ERROR, MAIN_CATEGORY, NULL_FLOW } from "../Helpers/constants";


//Передаём интерфейс состояний


//Создаётся объект и передаётся необходимый для дальнейших действий набор данных.
//! Пока под вопросом такой способ
const getFormActionsObject = (type = EEntityTypes.category, data: any) => {
	if (type === EEntityTypes.category) { return new CategoryFormActions(data) }
	else { return new FlowFormActions() }
}

class CategoryForm extends React.Component<RouteComponentProps<IParams> & { entityType: EEntityTypes }, ICategoryFormState> {
	private formActions;
	private params: IParams = {};
	private L_flowID: number = NULL_FLOW;
	private L_categoryID: number = MAIN_CATEGORY;
	private title = "";
	//Создаём объект с функциями, который для каждого вида формы имеет свои реализации функций
	constructor(props: RouteComponentProps<IParams> & { entityType: EEntityTypes }) {
		super(props);
		console.log(props);
		switch (props.entityType) {
			case EEntityTypes.flow: this.title = "Создать поток"; break;
			case EEntityTypes.category: this.title = "Создать категорию"; break;
			default: alert("Ошибка!"); break;
		}

		this.state = {
			containerName: CATEGORY_NAME_ERROR,
			name: "",
			description: "",
		};
		this.params = this.props.match.params;
		if (this.params.flowID)
			this.L_flowID = parseInt(this.params.flowID);
		if (this.params.categoryID)
			this.L_categoryID = parseInt(this.params.categoryID);
		let data = { categoryID: this.L_categoryID }
		this.formActions = getFormActionsObject(this.props.entityType, data);	
	}

	componentDidMount() {
		//В зависимости от истинности условий выполняем нужный код объекта с функциями
		//Однако чтобы передать ему управление состоянием, нужно передать функцию в колбэк
		//Либо же, если есть Redux, то он сам изменит состояние компонента
		if (this.L_categoryID) {
			this.formActions.initialize(this.params.action,
				(value: any) => {
					this.setState(value)
				}, this.L_categoryID)
		}
	}

	private handleSubmit = (event: FormEvent, submitType: string, formData: ICreateUpdateCategory,
	) => {
		//TODO передать submitType, тип объекта и formData в объект с действиями
		//TODO в зависимости от типа объекта и действия, он сам вызовет нужный метод
		const callbackFunction = this.props.history.push;
		this.formActions.handleSubmit(submitType, formData, callbackFunction);
		event.preventDefault();
	}

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ ...this.state, [event.target.name]: event.target.value });
	};

	render() {
		return (
			<form onSubmit={(event) => this.handleSubmit(event, this.params.action!,
				{
					//TODO Стоит провести рефакторинг, чтобы не передавалось два вида id с
					//TODO одинаковым кодом получения значения. Опасно.
					id: this.L_categoryID,
					upperCategoryID: this.L_categoryID,
					name: this.state.name,
					description: this.state.description,
				})}>
				<div className="form-group">
					<h2>{this.title}</h2>
					<label className="form-label mt-2">Надкатегория:</label>
					<span className="mx-2 font-italic text-info">
						{this.state.containerName}
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
		);

	}
}
export default CategoryForm;