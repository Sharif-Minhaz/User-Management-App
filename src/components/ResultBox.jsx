import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

function ResultBox(props) {
	const res = useContext(UserContext);
	return (
		<div className="col-xl-4 col-md-6 col-12 box-gap">
			<div className="card rounded bg-blue p-3">
				<p className="text-light card-text">User ID: {props.id}</p>
				<p className="text-light card-text">Username: {props.name}</p>
				<p className="text-light card-text">Email Add: {props.email}</p>
				<div className="mt-1">
					<button className="btn btn-info me-2">Edit</button>
					<button onClick={() => res.deleteUser(props.id)} className="btn btn-danger">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default ResultBox;
