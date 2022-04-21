import React, {useState} from "react";
import {userContext} from "../../../Contexts/userContext";
import {Auth} from "aws-amplify";
import {Link} from "react-router-dom";

function EditProfileForm() {
    const { attributes } = React.useContext(userContext);
    const username = attributes.email;
    const [firstName, setFirstName] = useState(attributes.given_name ? attributes.given_name : "");
    const [lastName, setLastName] = useState(attributes.family_name ? attributes.family_name : "");
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    async function updateUser(event) {
        event.preventDefault();
        const user = await Auth.currentAuthenticatedUser();
        try {
            await Auth.updateUserAttributes(user, {
                'given_name' : firstName,
                'family_name' : lastName,
                'name' : firstName + " " + lastName
            });
            setSuccessMsg("Profile updated");
            setErrorMsg(null);
        } catch (error) {
            console.log(error);
            setErrorMsg(error.message());
            setSuccessMsg(null);
        }
    }

    function handleChangeFirstName(event) {
        setFirstName(event.target.value);
    }

    function handleChangeLastName(event) {
        setLastName(event.target.value);
    }

    async function deleteAccount() {
        try {
            const result = await Auth.deleteUser();
            console.log(result);
        } catch (error) {
            console.log('Error deleting user', error);
        }
    }

    return (
        <form className="EditProfileForm" onSubmit={updateUser}>
            {successMsg != null && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg != null && <div className="alert alert-danger">{errorMsg}</div>}
            <label className="form-label" htmlFor="editProfileUsernameField">Email:</label>
            <input id="editProfileUsernameField" className="form-control disabled" type="text" readOnly value={username} name="username"/>
            <div className="invalid-feedback d-none">
                <p>Invalid Email</p>
            </div>

            <label className="form-label" htmlFor="editProfileFirstNameField" >First name:</label>
            <input id="editProfileFirstNameField" className="form-control" type="text" value={firstName} name="firstName" onChange={handleChangeFirstName} />
            <div className="invalid-feedback d-none">
                <p>Invalid first name</p>
            </div>

            <label className="form-label" htmlFor="editProfileLastNameField" >Last name:</label>
            <input id="editProfileLastNameField"  className="form-control" type="text" value={lastName} name="lastName" onChange={handleChangeLastName} />
            <div className="invalid-feedback d-none">
                <p>Invalid last name</p>
            </div>

            <Link className="link-primary" to={"/changePassword"}>Change Password</Link>
            <input className="btn btn-primary mt-3 d-block" type="submit" value="Submit" />
            <input className="btn btn-danger mt-3" type="button" value="Delete Account" onClick={deleteAccount} />
        </form>
    );
}

export default EditProfileForm;