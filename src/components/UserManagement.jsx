import React, { useState, useEffect, useCallback, createRef } from "react";
import User from "../utils/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import UserContext from "../contexts/UserContext";
import Loading from "./Loading";
import UserForm from "./UserForm";
import Result from "./Result";

const allUsers = new User();

function UserManagement(props) {
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [id, setId] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [updateBtn, setUpdateBtn] = useState(false);

	const formTop = createRef();

	const fetchData = useCallback(() => {
		allUsers
			.getUsers()
			.then((data) => {
				setUsers(data);
				setIsLoading(false);
			})
			.catch((error) => {
				handleError(error);
			});
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleError = (error) => {
		setIsLoading(false);
		console.error(error);
		throw new Error("Something went wrong!");
	};

	const handleSubmit = (event) => {
		setIsLoading(true);
		event.preventDefault();
		allUsers
			.addUser(username, email)
			.then((data) => {
				setUsers(data);
				setIsLoading(false);
				toast.success("User added successfully!");
			})
			.catch((error) => {
				handleError(error);
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
		setId("");
		setUpdateBtn(false);
	};

	const updateUserInputBox = (id) => {
		allUsers
			.updateInputBox(id)
			.then((data) => {
				setUsername(data.username);
				setEmail(data.email);
				setId(data._id);
				setUpdateBtn(true);
			})
			.catch((error) => {
				handleError(error);
			});
	};

	const updateUserInfo = (id) => {
		setIsLoading(true);
		allUsers
			.updateUser(id, username, email)
			.then((data) => {
				setUsers(data);
				resetForm();
				allUsers
					._findUsers(id)
					.then((data) => {
						data?.username
							? toast.info("User info updated successfully!")
							: toast.error("User not found!");
					})
					.catch((error) => {
						handleError(error);
					});
				setIsLoading(false);
			})
			.catch((error) => {
				handleError(error);
			});
	};

	const deleteUser = (id) => {
		setIsLoading(true);
		allUsers
			.deleteUser(id)
			.then(() => {
				fetchData();
				toast.error("User deleted successfully");
			})
			.catch((error) => {
				handleError(error);
			});
	};

	const gotoTop = () => {
		window.scroll(0, formTop.current?.scrollTop);
	};

	return (
		<UserContext.Provider value={{ users, deleteUser, updateUserInputBox }}>
			<div ref={formTop} className="container py-4">
				<ToastContainer autoClose={3000} />
				<h2 className="mb-4">User Form</h2>
				<UserForm
					username={username}
					email={email}
					id={id}
					updateBtn={updateBtn}
					resetForm={resetForm}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					updateUserInfo={updateUserInfo}
				/>
				<hr />
				<p>Total users found: {users.length}</p>
				{isLoading ? <Loading /> : <Result ref={gotoTop} />}
			</div>
		</UserContext.Provider>
	);
}

export default UserManagement;
