import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FlowService from "./FlowService";
const flowService = new FlowService();

const FlowsTable = () => {
	const [flows, setFlows] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		if (id)
			flowService.getFlows(id).then((flows) => {
				setFlows(flows.data);
			});
		return () => {
			setFlows([]);
		};
	}, [id]);

	const handleDelete = (id) => {
		flowService.deleteFlow({ id: id }).then(() => {
			const newFlowsCollection = flows.filter((obj) => obj.id !== id);
			setFlows(newFlowsCollection);
		});
	};

	return (
		<div>
			{flows.length ? (
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
								handleDelete={handleDelete}
							/>
						))}
					</tbody>
				</table>
			) : (
				id && <p>Список потоков пуст!</p>
			)}
			{id && (
				<Link to={"/flow/" + id + "/create"}>
					<button className="btn btn-primary my-3">Создать поток</button>
				</Link>
			)}
		</div>
	);
};

const Flow = (props) => {
	return (
		<tr>
			<td>{props.name}</td>
			<td>{props.body}</td>
			<td>
				<Link to={"/flow/" + props.id}>
					<button className="btn btn-primary mr-3">Открыть поток</button>
				</Link>
				<Link to={"/flow/" + props.id + "/update"}>
					<button className="btn btn-secondary mr-3">
						Редактировать поток
					</button>
				</Link>
				<button
					className="btn btn-danger mr-3"
					onClick={() => props.handleDelete(props.id)}
				>
					Удалить поток
				</button>
			</td>
		</tr>
	);
};

export default FlowsTable;
