import axios from "./axios";

export default class User {
	async getUsers() {
		try {
			const users = await axios.get(process.env.REACT_APP_BASE_URL);
			return users.data;
		} catch (err) {
			console.error(err);
		}
	}

	async addUser(username, email) {
		await axios.post(process.env.REACT_APP_BASE_URL + "user/add", {
			username,
			email,
		});
		return this.getUsers();
	}

	updateUser(id) {
		return this.getUsers();
	}

	async deleteUser(id) {
		await axios.delete(process.env.REACT_APP_BASE_URL + "user/delete/" + id);
		return this.getUsers();
	}
}
