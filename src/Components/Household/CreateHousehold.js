import React, {useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {createHousehold} from "../../graphql/mutations";

function CreateHousehold() {
    const [householdName, setHouseholdName] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const household = {
            name: householdName,
            description: 'Test household'
        }
        try {
            const newHousehold = await API.graphql(graphqlOperation(createHousehold, {input: household}));
            console.log(newHousehold);
        } catch (error) {
            console.log(error);
        }
    }

    function handleChangeHouseholdName(event) {
        setHouseholdName(event.target.value);
    }

    return (
        <form className="CreateHouseholdForm" onSubmit={handleSubmit} >
            <label className="form-label" htmlFor="householdNameField" > Name: </label>
            <input id="householdNameField" className="form-control" type="text" value={householdName} name="householdName" onChange={handleChangeHouseholdName} />
            <input className="btn btn-primary mt-3 d-block" type="submit" value="Create" />
        </form>
    );
}

export default CreateHousehold;