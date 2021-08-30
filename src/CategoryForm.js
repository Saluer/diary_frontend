import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import CategoryService from "./CategoryService";

const categoryService = new CategoryService();

class CategoryForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			upperCategoryName: "Основная категория",
			name: "",
			description: "",
		};
	}

	componentDidMount() {
		const {
			match: { params },
		} = this.props;
		if (params.action === "create")
			if (params && params.id)
				categoryService.getCategories(params.id).then((category) => {
					this.setState({
						upperCategoryName: category.upper_category.name,
						name: category.name,
						description: category.description,
					});
				});
			else params.id = "";
		else if (params.action === "update")
			if (params && params.id) {
				categoryService.getCategory({ id: params.id }).then((category) => {
					if (category.upper_category_name)
						this.setState({ categoryUpperName: category.upper_category_name });
					const categoryData = category.data;
					this.setState({
						name: categoryData.name,
						description: categoryData.description,
					});
				});
			} else params.id = "";
	}

	handleCreate = (event) => {
		const {
			match: { params },
		} = this.props;
		categoryService
			.createCategory({
				upperCategoryId: params.id,
				category_name: this.state.name,
				category_description: this.state.description,
			})
			.then(() => {
				alert("Создано");
				params.id
					? this.props.history.push("/category/" + params.id)
					: this.props.history.push("/");
			})
			.catch(() => {
				alert("There was an error! Please re-check your form.");
			});
		event.preventDefault();
	};

	handleUpdate = (event) => {
		const {
			match: { params },
		} = this.props;
		categoryService
			.updateCategory({
				id: params.id,
				category_name: this.state.name,
				category_description: this.state.description,
			})
			.then(() => {
				alert("Category updated!");
				params.id
					? this.props.history.push("/category/" + params.id)
					: this.props.history.push("/");
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
		console.log(params);
		if (params.action === "create")
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
		else if (params.action === "update")
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
