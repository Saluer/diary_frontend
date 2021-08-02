import React, { useEffect, useState } from "react";
import CategoryService from "./CategoryService";

const categoryService = new CategoryService();

const CategoryCreateUpdateForm = (props) => {
	const [name, setName] = useState("");

	useEffect(() => {
		const {
			match: { params },
		} = props;

		if (params && params.id) {
			categoryService.getCategory(params.id).then((c) => {
				setName(c.name);
			});
		}
	}, [props]);

	const handleCreate = () => {
		categoryService
			.createCategory({
				name: name,
			})
			.then((result) => {
				alert("Category created!");
			})
			.catch(() => {
				alert("There was an error! Please re-check your form.");
			});
	};

	const handleUpdate = (id) => {
		categoryService
			.updateCategory({
				id: id,
				name: name,
			})
			.then((result) => {
				alert("Category updated!");
			})
			.catch(() => {
				alert("There was an error! Please re-check your form.");
			});
	};

	const handleSubmit = (event) => {
		const {
			match: { params },
		} = props;

		if (params && params.id) {
			handleUpdate(params.id);
		} else {
			handleCreate();
		}

		event.preventDefault();
	};

	const handleChange = (e) => {
		setName(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Название:</label>
				<input
					className="form-control"
					type="text"
					value={name}
					onChange={handleChange}
				/>
				
				<label className="form-label">Надкатегория:</label>
				<select className="form-select"></select>
				<input className="btn btn-primary" type="submit" value="Submit" />
			</div>
		</form>
	);
};

export default CategoryCreateUpdateForm;
