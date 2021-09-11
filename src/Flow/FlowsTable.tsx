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
	useEffect(() => {
		if (categoryID)
			flowService.getFlows({ categoryID }).then((flows) => {
				setFlows(flows.data);
			});
		return () => {
			setFlows([]);
		};
	}, [categoryID]);

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
				categoryID && <p>Список потоков пуст!</p>
			)}
			{categoryID && (
				<Link to={categoryID + "/flow/create"}>
					<button className="btn btn-primary my-3">Создать поток</button>
				</Link>
			)}
		</div>
	);
};

const Flow = (props: any & ({ handleDelete: (id: string) => void })) => {
	const { categoryID } = useParams<{ categoryID: string }>();
	return (
		<tr>
			<td>{props.name}</td>
			<td>{props.description}</td>
			<td>
				<Link to={categoryID + "/flow/" + props.id}>
					<button className="btn btn-primary mr-3">Открыть поток</button>
				</Link>
				<Link to={categoryID + "/flow/" + props.id + "/update"}>
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
