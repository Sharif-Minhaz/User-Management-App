import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import ResultBox from "./ResultBox";

const Result = React.forwardRef((props, ref) => {
	const res = useContext(UserContext);
	return (
		<div className="row">
			{res.users.map((user) => {
				return (
					<ResultBox
						key={user._id}
						id={user._id}
						name={user.username}
						email={user.email}
						ref={ref}
					/>
				);
			})}
		</div>
	);
});

export default Result;
