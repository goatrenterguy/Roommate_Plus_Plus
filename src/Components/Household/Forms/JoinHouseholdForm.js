import {useContext, useState} from "react";
import {API} from "aws-amplify";
import {updateUser} from "../../../graphql/mutations";
import {userContext} from "../../../Contexts/userContext";

function JoinHouseholdForm({handleFormChange}) {
	const userID = useContext(userContext).user.username;
	const [householdID, setHouseholdID] = useState("");

	function handleHouseholdIDChange(event) {
		setHouseholdID(event.target.value);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const updateHouseholdID = await API.graphql({
				query: updateUser,
				variables: {
					input: {
						id: userID,
						householdID: householdID
					}
				},
				authMode: "AMAZON_COGNITO_USER_POOLS"
			});
			console.log(updateHouseholdID);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="container">
			<h1 className="h1">Join a household</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-floating">
					<input className="form-control" id="householdIdInput" type="text" placeholder="Household ID"
					       value={householdID} onChange={handleHouseholdIDChange}/>
					<label htmlFor="householdIdInput">Household Id</label>
				</div>
				<button className="btn btn-primary mt-2" type="submit">Join Household</button>
				<button className="btn btn-secondary mt-2 d-block" type="button" onClick={handleFormChange}>Create Household</button>
			</form>
		</div>
	);
}

export default JoinHouseholdForm;