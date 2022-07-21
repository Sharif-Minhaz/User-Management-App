import React, { useState, useEffect, createContext } from "react";
import User from "../utils/user";
import UserContext from "../contexts/UserContext";
import UserForm from "./UserForm";
import Result from './Result';

const allUsers = new User();

function UserManagement(props) {
	const [users, setUsers] = useState([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		allUsers.getUsers().then((data) => {
			setUsers(data);
		});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const handleChange = (event) => {
		if (event.target.name === "name") {
			setName(event.target.value);
		} else {
			setEmail(event.target.value);
		}
	};

	return (
		<UserContext.Provider value={users}>
			<UserForm
				name={name}
				email={email}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
			<Result />
		</UserContext.Provider>
	);
}

export default UserManagement;
