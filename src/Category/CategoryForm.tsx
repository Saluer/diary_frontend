import React, { FormEvent } from "react";
import CategoryService from "./CategoryService";
import { RouteComponentProps } from "react-router";
import { IParams, ICategoryFormState } from "../types";
const categoryService = new CategoryService();

class CategoryForm extends React.Component<RouteComponentProps<IParams>, ICategoryFormState> {
	params:IParams;
	constructor(props: RouteComponentProps<IParams>) {
		super(props);
		this.state = {
			upperCategoryName: "Основная категория",
			name: "",
			description: "",
		};
		this.params = this.props.match.params;
	}

	componentDidMount() {
		if (this.params.action === "create")
			if (this.params && this.params.id) {
				categoryService.getCategories(this.params.id).then((category) => {
					this.setState({
						upperCategoryName: category.upper_category.name,
						name: category.name,
						description: category.description,
					});
				});
			}
			else this.params.id = "";
		else if (this.params.action === "update")
			if (this.params && this.params.id) {
				categoryService.getCategory({ id: this.params.id }).then((category) => {
					if (category.upper_category_name)
						this.setState({ upperCategoryName: category.upper_category_name });
					const categoryData = category.data;
					this.setState({
						name: categoryData.name,
						description: categoryData.description,
					});
				});
			} else this.params.id = "";
	}

	handleCreate = (event: FormEvent) => {
		categoryService
			.createCategory({
				upperCategoryId: this.params.id,
				name: this.state.name,
				description: this.state.description,
			})
			.then(() => {
				alert("Создано");
				this.params.id
					? this.props.history.push("/category/" + this.params.id)
					: this.props.history.push("/");
			})
			.catch(() => {
				alert("There was an error! Please re-check your form.");
			});
		event.preventDefault();
	};

	handleUpdate = (event: FormEvent) => {
		categoryService
			.updateCategory({
				id: this.params.id,
				name: this.state.name,
				description: this.state.description,
			})
			.then(() => {
				alert("Category updated!");
				this.params.id
					? this.props.history.push("/category/" + this.params.id)
					: this.props.history.push("/");
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
		console.log(this.params);
		if (this.params.action === "create")
			return (
				<form onSubmit={this.handleCreate}>
					<div className="form-group">
						<h2>Создание новой категории</h2>
						<label className="form-label mt-2">Надкатегория:</label>
						<span className="mx-2 font-italic text-info">
							{this.state.upperCategoryName}
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
						<h2>Редактирование категории</h2>
						<label className="form-label mt-2">Надкатегория:</label>
						<span className="mx-2 font-italic text-info">
							{this.state.upperCategoryName}
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
export default CategoryForm;