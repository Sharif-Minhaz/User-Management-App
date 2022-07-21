import React from "react";

function ResultBox(props) {
	return (
		<div className="col-4">
			<div className="card rounded bg-secondary p-3">
				<p className="text-light card-text">User ID: {props.id}</p>
				<p className="text-light card-text">User Name: {props.name}</p>
				<p className="text-light card-text">Email Add: {props.email}</p>
				<div className="mt-1">
					<button>Edit</button>
					<button>Delete</button>
				</div>
			</div>
		</div>
	);
}

export default ResultBox;
