import {useState} from "react";
import JoinHouseholdForm from "./Forms/JoinHouseholdForm";
import CreateHouseholdForm from "./Forms/CreateHouseholdForm";

function CreateJoinHousehold(props) {
	const [createHousehold, setCreateHousehold] = useState(false);

	function handleFormChange() {
		setCreateHousehold(!createHousehold);
	}

	if (!createHousehold) {
		return (
			<JoinHouseholdForm handleFormChange={handleFormChange}/>
		);
	} else {
		return (
			<CreateHouseholdForm/>
		)
	}
}

export default CreateJoinHousehold;