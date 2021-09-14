import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FlowService from "./FlowService";
import { IParams } from "../types";
const flowService = new FlowService();

const FlowsTable = () => {
	const [flows, setFlows] = useState<{
		id: number;
		name: string;
		description: string;
		categoryName: string;
	}[]>([]);
	const categoryID = useParams<IParams>().categoryID;
	let L_categoryID = 0;
	if(categoryID)
		L_categoryID = parseInt(categoryID);
	useEffect(() => {
		if (L_categoryID)
			flowService.getFlows(L_categoryID).then((response) => {
				setFlows(response.flows_data);
			});
		return () => {
			setFlows([]);
		};
	}, [L_categoryID]);

	const handleDelete = (flowID: number) => {
		flowService.deleteFlow(flowID).then(() => {
			//?
			const newFlowsCollection = flows.filter((flow: { id: number }) => flow.id !== flowID);
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
								description={flow.description}
								categoryName={flow.categoryName}
								handleDelete={handleDelete}
							/>
						))}
					</tbody>
				</table>
			) : (
				L_categoryID > 0 && <p>Список потоков пуст!</p>
			)}
			{L_categoryID > 0 && (
				<Link to={L_categoryID + "/flow/create"}>
					<button className="btn btn-primary my-3">Создать поток</button>
				</Link>
			)}
		</div>
	);
};

const Flow = (props: { id: number, name: string, description: string, categoryName: string, handleDelete: (id: number) => void }) => {
	const { categoryID } = useParams<{ categoryID: string }>();
	let L_categoryID = 0;
	if(categoryID)
		L_categoryID = parseInt(categoryID);
	return (
		<tr>
			<td>{props.name}</td>
			<td>{props.description}</td>
			<td>
				<Link to={L_categoryID + "/flow/" + props.id}>
					<button className="btn btn-primary mr-3">Открыть поток</button>
				</Link>
				<Link to={L_categoryID + "/flow/" + props.id + "/update"}>
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
