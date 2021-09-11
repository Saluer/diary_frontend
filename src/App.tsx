import React, { Component } from "react";
import { BrowserRouter, Switch, Link, Route } from "react-router-dom";
import CategoryDispatcher from "./Category/Category";
import FlowDispatcher from "./Flow/Flow";
import "./App.css";

const BaseLayout = () => (
	<div className="container-fluid">
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<p className="navbar-brand">Diary</p>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavAltMarkup"
				aria-controls="navbarNavAltMarkup"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div className="navbar-nav">
					<Link className="nav-item nav-link" to="/">
						Главная
					</Link>
				</div>
			</div>
		</nav>
		<div className="content">
			<CategoryFlowDispatcher />
		</div>
	</div>
);

const CategoryFlowDispatcher = (props:any) => {
	console.log(props);
	return (
		<Switch>
			<Route path="/category/:categoryID(\d+)/flow" component={FlowDispatcher} />
			<Route path="/(category)?"  component={CategoryDispatcher} />
		</Switch>
	);
};

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<BaseLayout />
			</BrowserRouter>
		);
	}
}
export default App;
