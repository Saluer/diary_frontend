import React, { useEffect, useState } from "react";
import CategoryService from "./CategoryService";

const categoryService = new CategoryService();

const CategoryCreateUpdateForm = (props) => {
	console.log(
		"🚀 ~ file: CategoryCreateUpdateForm.js ~ line 7 ~ CategoryCreateUpdateForm ~ props",
		props
	);
	const [name, setName] = useState("");
	const [upperCategoryName, setUpperCategoryName] = useState("");
	const {
		match: { params },
	} = props;
	useEffect(() => {
		if (params && params.id) {
			categoryService.getCategories(params.id).then((c) => {
				setUpperCategoryName(c.upper_category.name);
			});
		} else params.id = "";
		return () => {
			setName("");
			setUpperCategoryName("");
		};
	}, [params]);

	const handleCreate = () => {
		console.log(params.id, name);
		categoryService
			.createCategory({
				category_name: name,
			}, params.id,)
			.then((result) => {
				alert(result);
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
		handleCreate();

		event.preventDefault();
	};

	const handleChange = (e) => {
		setName(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="form-label">Надкатегория:</label>
				<span className="mx-2 font-italic text-info">{upperCategoryName}</span>
				<br />
				<label>Название:</label>
				<input
					className="form-control"
					type="text"
					value={name}
					onChange={handleChange}
				/>
				<input className="btn btn-primary mt-2" type="submit" value="Submit" />
			</div>
		</form>
	);
};

export default CategoryCreateUpdateForm;
