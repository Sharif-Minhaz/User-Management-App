import React from "react";

function UserForm(props) {
	return (
		<div className="row">
			<div className="col-md-6 col-12">
				<form onSubmit={props.handleSubmit}>
					<div className="form-floating mb-3">
						<input
							type="text"
							name="name"
							onChange={props.handleChange}
							value={props.username}
							className="form-control"
							id="floatingInput"
							placeholder="name"
							required
						/>
						<label htmlFor="floatingInput">Username</label>
					</div>

					<div className="form-floating">
						<input
							value={props.email}
							type="email"
							onChange={props.handleChange}
							className="form-control"
							name="password"
							id="floatingPassword"
							placeholder="Email"
							required
						/>
						<label htmlFor="floatingPassword">Email Address</label>
						<input type="hidden" value={props.id} />
					</div>
					{props.updateBtn ? (
						<button
							type="button"
							className="btn btn-success mt-3"
							onClick={() => props.updateUserInfo(props.id)}
						>
							Update
						</button>
					) : (
						<button className="btn btn-primary mt-3" type="submit">
							Add
						</button>
					)}
				</form>
			</div>
		</div>
	);
}

export default UserForm;
