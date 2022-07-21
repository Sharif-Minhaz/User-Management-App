import React, { useState, useEffect } from "react";
import User from "../utils/user";
import UserContext from "../contexts/UserContext";
import UserForm from "./UserForm";
import Result from "./Result";

const allUsers = new User();

function UserManagement(props) {
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		allUsers.getUsers().then((data) => {
			setUsers(data);
		});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		allUsers.addUser(username, email).then((data) => {
			setUsers(data);
		});
		event.target.reset();
		resetForm();
	};

	const handleChange = (event) => {
		if (event.target.name === "name") {
			setUsername(event.target.value);
		} else {
			setEmail(event.target.value);
		}
	};

	const resetForm = () => {
		setUsername("");
		setEmail("");
	};

	return (
		<UserContext.Provider value={users}>
			<div className="container py-4">
				<h2 className="mb-4">User Form</h2>
				<UserForm
					username={username}
					email={email}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
				<hr />
				<p>Total users found: {users.length}</p>
				<Result />
			</div>
		</UserContext.Provider>
	);
}

export default UserManagement;
