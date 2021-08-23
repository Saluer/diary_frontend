import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlowService from "./FlowService";
import { Switch, Route } from "react-router-dom";
const flowService = new FlowService();

const FlowDispatcher = () => {
	return (
		<Switch>
			{/* <Route path="/(flow)?/:id?/create" exact component={FlowForm} />
			<Route path="/(flow)?/:id/update" exact component={FlowyForm} /> */}
			<Route path="/flow/:id" exact component={FlowsTable} />
		</Switch>
	);
};

const FlowsTable = ({ props }) => {
	console.log("🚀 ~ file: Flow.js ~ line 7 ~ FlowsTable ~ props", props);
	const {
		match: { params },
	} = props;

	const [flows, setFlows] = useState([]);

	useEffect(() => {
		if (params && params.id)
			flowService.getFlows(params.id).then(({ data }) => {
				setFlows(data);
			});
		return () => {
			setFlows([]);
		};
	}, [params]);
	if (flows.length)
		return (
			<table className="table table-hover mt-5">
				<thead>
					<tr>
						<th>Название потока</th>
						<th>Тело потока</th>
					</tr>
				</thead>
				<tbody>
					{flows.map((flow) => (
						<Flow
							key={flow.id}
							id={flow.id}
							name={flow.name}
							body={flow.body}
						/>
					))}
				</tbody>
			</table>
		);
	else return null;
};

const Flow = (props) => {
	return (
		<tr>
			<td>{props.name}</td>
			<td>{props.body}</td>
			<td>
				<Link to={"/flow/" + props.id}>
					<button className="btn btn-primary">Открыть поток</button>
				</Link>
			</td>
		</tr>
	);
};
export default FlowDispatcher;
