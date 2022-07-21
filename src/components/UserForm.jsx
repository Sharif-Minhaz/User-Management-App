import React from "react";

function UserForm(props) {
	return (
		<form onSubmit={props.handleSubmit}>
			<input
				value={props.name}
				onChange={props.handleChange}
				name="name"
				type="text"
				placeholder="Enter username"
				required
			/>
			<input
				value={props.email}
				onChange={props.handleChange}
				name="password"
				type="email"
				placeholder="Enter email"
				required
			/>
			<button type="submit">Add</button>
		</form>
	);
}

export default UserForm;
