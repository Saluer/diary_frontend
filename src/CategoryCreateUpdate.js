import React, { Component } from "react";
import CategoriesService from "./CategoriesService";

const categoriesService = new CategoriesService();

class CategoryCreateUpdate extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const {
			match: { params },
		} = this.props;
            console.log("🚀 ~ file: CategoryCreateUpdate.js ~ line 16 ~ CategoryCreateUpdate ~ componentDidMount ~ params", params)
		
		if (params && params.id) {
			categoriesService.getCategory(params.id).then((c) => {
				this.refs.firstName.value = c.first_name;
				this.refs.lastName.value = c.last_name;
				this.refs.email.value = c.email;
				this.refs.phone.value = c.phone;
				this.refs.address.value = c.address;
				this.refs.description.value = c.description;
			});
		}
	}

	handleCreate() {
		categoriesService
			.createCategory({
				first_name: this.refs.firstName.value,
				last_name: this.refs.lastName.value,
				email: this.refs.email.value,
				phone: this.refs.phone.value,
				address: this.refs.address.value,
				description: this.refs.description.value,
			})
			.then((result) => {
				alert("Category created!");
			})
			.catch(() => {
				alert("There was an error! Please re-check your form.");
			});
	}

	handleUpdate(id) {
		categoriesService
			.updateCategory({
				id: id,
				first_name: this.refs.firstName.value,
			})
			.then((result) => {
				console.log(result);
				alert("Category updated!");
			})
			.catch(() => {
				alert("There was an error! Please re-check your form.");
			});
	}

	handleSubmit(event) {
		const {
			match: { params },
		} = this.props;

		if (params && params.id) {
			this.handleUpdate(params.id);
		} else {
			this.handleCreate();
		}

		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label>Название:</label>
					<input className="form-control" type="text" ref="name" />

					<input className="btn btn-primary" type="submit" value="Submit" />
				</div>
			</form>
		);
	}
}

export default CategoryCreateUpdate;
