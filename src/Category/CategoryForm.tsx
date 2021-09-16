import React, { FormEvent } from "react";
import CategoryService from "./CategoryService";
import { RouteComponentProps } from "react-router";
import { IParams, ICategoryFormState, EActions, ICreateUpdateCategory, EEntityTypes } from "../types";
import { Input } from "../Helpers/Inputs";
import { AxiosResponse } from "axios";
import { CategoryFormActions, FlowFormActions } from "./CategoryFormActions";

const categoryService = new CategoryService();


const CATEGORY_NAME_ERROR = "Основная категория"
const CREATION_SUCCESS_MESSAGE = "Вы успешно создали объект"
const CREATION_ERROR_MESSAGE = "Произошла ошибка при создании объекта"
const UPDATE_SUCCESS_MESSAGE = "Вы успешно обновили объект"
const UPDATE_ERROR_MESSAGE = "Произошла ошибка при обновлении объекта"

const MAIN_CATEGORY = 0;
const NULL_FLOW = 0;
//Передаём интерфейс состояний



const getFormActionsObject = (type=EEntityTypes.category) => {
	if (type === EEntityTypes.category) { return new CategoryFormActions() }
	else { return new FlowFormActions() }
}

class CategoryForm extends React.Component<RouteComponentProps<IParams> & {entityType:EEntityTypes}, ICategoryFormState> {
	private categoryFormActions;
	private params: IParams = {};
	private L_flowID: number = NULL_FLOW;
	private L_categoryID: number = MAIN_CATEGORY;
	//Создаём объект с функциями, который для каждого вида формы имеет свои реализации функций
	constructor(props: RouteComponentProps<IParams> & {entityType:EEntityTypes}) {
		super(props);
		this.state = {
			containerName: CATEGORY_NAME_ERROR,
			name: "",
			description: "",
		};
		this.params = this.props.match.params;
		this.categoryFormActions = getFormActionsObject(EEntityTypes.category);
		if (this.params.flowID)
			this.L_flowID = parseInt(this.params.flowID);
		if (this.params.categoryID)
			this.L_categoryID = parseInt(this.params.categoryID);
	}

	componentDidMount() {
		//В зависимости от истинности условий выполняем нужный код объекта с функциями
		//Однако чтобы передать ему управление состоянием, нужно передать функцию в колбэк
		//Либо же, если есть Redux, то он сам изменит состояние компонента
		if (this.L_categoryID) {
			this.categoryFormActions.initialize(this.params.action,
				(value: any) => {
					this.setState(value)
				}, this.L_categoryID)
		}
	}

	private handleSubmit = (event: FormEvent, submitType: string, formData: ICreateUpdateCategory,
	) => {
		let submitFunction: Promise<AxiosResponse<void>>;
		let successMessageText = "", errorMessageText = ""
		if (submitType === EActions.create) {
			successMessageText = CREATION_SUCCESS_MESSAGE;
			errorMessageText = CREATION_ERROR_MESSAGE;
			submitFunction = categoryService.createCategory(formData);
		}
		else if (submitType === EActions.update) {
			successMessageText = UPDATE_SUCCESS_MESSAGE;
			errorMessageText = UPDATE_ERROR_MESSAGE;
			submitFunction = categoryService.updateCategory(formData);
		}
		else {
			console.log("Submit error");
			return
		};
		submitFunction.then(() => {
			alert(successMessageText);
			this.L_categoryID !== MAIN_CATEGORY
				? this.props.history.push("/category/" + this.L_categoryID)
				: this.props.history.push("/");
		})
			.catch(() => {
				alert(errorMessageText);
			});
		event.preventDefault();
	}

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ ...this.state, [event.target.name]: event.target.value });
	};

	render() {
		return (
			<form onSubmit={(event) => this.handleSubmit(event, this.params.action!,
				{
					id: this.L_categoryID,
					name: this.state.name,
					description: this.state.description,
				})}>
				<div className="form-group">
					<h2>Создание новой категории</h2>
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