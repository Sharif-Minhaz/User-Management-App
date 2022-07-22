import React, { useState, useEffect } from "react";
import User from "../utils/User";
import UserContext from "../contexts/UserContext";
import Loading from "./Loading";
import UserForm from "./UserForm";
import Result from "./Result";

const allUsers = new User();

function UserManagement(props) {
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		allUsers
			.getUsers()
			.then((data) => {
				setUsers(data);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.error(error);
				throw new Error("Something went wrong!");
			});
	};

	const handleSubmit = (event) => {
		setIsLoading(true);
		event.preventDefault();
		allUsers.addUser(username, email).then((data) => {
			setUsers(data);
			setIsLoading(false);
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

	const deleteUser = (id) => {
		setIsLoading(true);
		allUsers.deleteUser(id).then(() => {
			fetchData();
		});
	};

	return (
		<UserContext.Provider value={{ users, deleteUser }}>
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
				{isLoading ? <Loading /> : <Result />}
			</div>
		</UserContext.Provider>
	);
}

export default UserManagement;
