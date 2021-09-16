import React, { FormEvent } from "react";
import CategoryService from "./CategoryService";
import { RouteComponentProps } from "react-router";
import { IParams, ICategoryFormState, EActions, ICreateUpdateCategory } from "../types";
import { Input } from "../Helpers/Inputs";
import { AxiosResponse } from "axios";
const categoryService = new CategoryService();


const CATEGORY_NAME_ERROR = "Основная категория"
const CREATION_SUCCESS_MESSAGE = "Вы успешно создали объект"
const CREATION_ERROR_MESSAGE = "Произошла ошибка при создании объекта"
const UPDATE_SUCCESS_MESSAGE = "Вы успешно обновили объект"
const UPDATE_ERROR_MESSAGE = "Произошла ошибка при обновлении объекта"

const MAIN_CATEGORY = 0;

class CategoryForm extends React.Component<RouteComponentProps<IParams>, ICategoryFormState> {
	private params: IParams;
	private L_categoryID: number = MAIN_CATEGORY;
	constructor(props: RouteComponentProps<IParams>) {
		super(props);
		this.state = {
			upperCategoryName: CATEGORY_NAME_ERROR,
			name: "",
			description: "",
		};
		this.params = this.props.match.params;
		if (this.params.categoryID)
			this.L_categoryID = parseInt(this.params.categoryID);
	}

	componentDidMount() {
		if (this.params.action === EActions.create) {
			if (this.L_categoryID) {
				categoryService.getCategory(this.L_categoryID).then((category: {
					data: {
						name: string;
						description: string;
					},
					upper_category_name: string;
				}) => {
					this.setState({ upperCategoryName: category.data.name });
				});
			}
		}
		else if (this.params.action === EActions.update)
			if (this.L_categoryID) {
				categoryService.getCategory(this.L_categoryID).then((category: {
					data: {
						name: string;
						description: string;
					},
					upper_category_name: string;
				}) => {
					if (category.upper_category_name)
						this.setState({ upperCategoryName: category.upper_category_name });
					const categoryData = category.data;
					this.setState({
						name: categoryData.name,
						description: categoryData.description,
					});
				});
			}
	}

	handleSubmit = (event: FormEvent, submitType: EActions, formData: ICreateUpdateCategory,
	) => {
		let submitFunction: Promise<AxiosResponse<void>>;
		let successMessageText = "", errorMessageText = ""
		if (submitType === EActions.create) {
			submitFunction = categoryService.createCategory(formData);
			successMessageText = CREATION_SUCCESS_MESSAGE;
			errorMessageText = CREATION_ERROR_MESSAGE;
		}
		else if (submitType === EActions.update) {
			submitFunction = categoryService.updateCategory(formData);
			successMessageText = UPDATE_SUCCESS_MESSAGE;
			errorMessageText = UPDATE_ERROR_MESSAGE;
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

	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
						{this.state.upperCategoryName}
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