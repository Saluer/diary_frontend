import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FlowService from "./FlowService";
import { IParams } from "../types";
const flowService = new FlowService();

const FlowsTable = () => {
	const [flows, setFlows] = useState<any[]>([]);
	const id = useParams<IParams>().categoryID;
	useEffect(() => {
		if (id)
			flowService.getFlows({id}).then((flows) => {
				setFlows(flows.data);
			});
		return () => {
			setFlows([]);
		};
	}, [id]);

	const handleDelete = (id: string) => {
		flowService.deleteFlow({ id: id }).then(() => {
			const newFlowsCollection = flows.filter((obj: any) => obj.id !== id);
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
				id && <p>Список потоков пуст!</p>
			)}
			{id && (
				<Link to={id+ "/flow/create"}>
					<button className="btn btn-primary my-3">Создать поток</button>
				</Link>
			)}
		</div>
	);
};

const Flow = (props: any & ({handleDelete:(id:string)=>void})) => {
	const { flowID } = useParams<{ flowID: string }>();
	console.log(flowID);
	return (
		<tr>
			<td>{props.name}</td>
			<td>{props.description}</td>
			<td>
				<Link to={flowID+ "/flow/" + props.flowID}>
					<button className="btn btn-primary mr-3">Открыть поток</button>
				</Link>
				<Link to={flowID + "/flow/" + props.flowID + "/update"}>
					<button className="btn btn-secondary mr-3">
						Редактировать поток
					</button>
				</Link>
				<button
					className="btn btn-danger mr-3"
					onClick={() => props.handleDelete(props.flowID!)}
				>
					Удалить поток
				</button>
			</td>
		</tr>
	);
};

export default FlowsTable;
