import axios from "./axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export default class User {
	async getUsers() {
		try {
			const users = await axios.get(baseUrl);
			return users.data;
		} catch (err) {
			console.error(err);
		}
	}

	async addUser(username, email) {
		await axios.post(baseUrl + "user/add", {
			username,
			email,
		});
		return this.getUsers();
	}

	async _findUsers(id) {
		const user = await axios.get(baseUrl + "user/" + id);
		return user.data;
	}

	async updateInputBox(id) {
		return this._findUsers(id);
	}

	async updateUser(id, username, email) {
		await axios.put(baseUrl + "user/update/" + id, {
			username,
			email,
		});
		return this.getUsers();
	}

	async deleteUser(id) {
		await axios.delete(baseUrl + "user/delete/" + id);
		return this.getUsers();
	}
}
