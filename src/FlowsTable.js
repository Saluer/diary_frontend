import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FlowService from "./FlowService";
const flowService = new FlowService();

const FlowsTable = ({ props }) => {
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
	
const handleDelete=(event, id)=>{
	flowService.deleteFlow({ id: id }).then(() => {
		const newArr = flows.filter(function (obj) {
			return obj.id !== id;
		});
		setFlows(newArr);
	});
}

	if (flows.length)
		return (
			<div>
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
                <Link to={"/flow/" + params.id + "/create"}>
                    <button className="btn btn-primary">Создать поток</button>
                </Link>
			</div>
		);
	else return <p>Список потоков пуст!</p>;
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
				<button className="btn btn-danger mr-3" onClick={(event)=>props.handleDelete(event, props.id)}>Удалить поток</button>
			</td>
		</tr>
	);
};

export default FlowsTable;
