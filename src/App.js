import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Link} from "react-router-dom";
import Category from "./Category";
import FlowsTable from "./Flow";

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
						Categories
					</Link>
					{/* <Link className="nav-item nav-link" to="/category">
						Create category
					</Link> */}
				</div>
			</div>
		</nav>
		<div className="content">
			<Category/>
			<FlowsTable/>
		</div>
	</div>
);

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
