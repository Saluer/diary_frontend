import React, { Component } from "react";

import CategoriesService from "./CategoriesService";

const categoriesService = new CategoriesService();

class CategoriesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			nextPageURL: "",
		};
		this.nextPage = this.nextPage.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		var self = this;
		categoriesService.getCategories().then(function (result) {
			self.setState({ categories: result.data, nextPageURL: result.nextlink });
		});
	}

	handleDelete(e, id) {
		var self = this;
		categoriesService.deleteCategory({ id: id }).then(() => {
			var newArr = self.state.categories.filter(function (obj) {
				return obj.id !== id;
			});

			self.setState({ categories: newArr });
		});
	}

	nextPage() {
		var self = this;
		categoriesService
			.getCategoriesByURL(this.state.nextPageURL)
			.then((result) => {
				self.setState({
					categories: result.data,
					nextPageURL: result.nextlink,
				});
			});
	}

	render() {
		return (
			<div className="categories--list">
				<table className="table">
					<thead key="thead">
						<tr>
							<th>ID</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.categories.map((c) => (
							<tr key={c.id}>
								<td>{c.id} </td>
								<td>{c.name}</td>
								<td>
									<button onClick={(e) => this.handleDelete(e, c.id)}>
										{" "}
										Delete
									</button>
									<a href={"/category/" + c.id}> Update</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{
					<button className="btn btn-primary" onClick={this.nextPage}>
						Next
					</button>
				}
			</div>
		);
	}
}
export default CategoriesList;
