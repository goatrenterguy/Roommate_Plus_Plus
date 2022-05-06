import React, {useState} from "react";
import {API} from "aws-amplify";
import {createHousehold} from "../../../graphql/mutations";

function CreateHouseholdForm() {
    const [householdName, setHouseholdName] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const household = {
            name: householdName,
            description: 'Test household'
        }
        try {
            const newHousehold = await API.graphql({
                query: createHousehold,
                variables: {input: household},
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
            console.log(newHousehold);
        } catch (error) {
            console.log(error);
        }
    }

    function handleChangeHouseholdName(event) {
        setHouseholdName(event.target.value);
    }

    return (
        <div className="container">
            <h1 className="h1">Create a household</h1>
            <form onSubmit={handleSubmit} >
                <div className="form-floating">
                    <input id="householdNameField" className="form-control" type="text" placeholder="Household Name" name="householdName" onChange={handleChangeHouseholdName} />
                    <label htmlFor="householdNameField" >Household name</label>
                </div>
                <input className="btn btn-primary mt-3 d-block" type="submit" value="Create" />
            </form>
        </div>

    );
}

export default CreateHouseholdForm;