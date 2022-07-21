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

	async addUser() {
        
		return this.getUsers();
	}

	updateUser(id) {
		return this.getUsers();
	}

	deleteUser(id) {
		return this.getUsers();
	}
}