import FormErrorMsg from "../FormErrorMsg";
import React, {useState} from "react";
import {userContext} from "../../../Contexts/userContext";
import {Auth} from "aws-amplify";

function EditProfileForm() {
    const { attributes} = React.useContext(userContext);
    const username = attributes.email;
    const [firstName, setFirstName] = useState(attributes.given_name ? attributes.given_name : "");
    const [lastName, setLastName] = useState(attributes.family_name ? attributes.family_name : "");
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    async function updateUser(event) {
        event.preventDefault();
        const user = await Auth.currentAuthenticatedUser();
        try {
            await Auth.updateUserAttributes(user, {
                'given_name' : firstName,
                'family_name' : lastName,
                'name' : firstName + lastName
            });
            setSuccessMsg("Profile updated");
            setErrorMsg(null);
        } catch (error) {
            console.log(error);
            setErrorMsg(error.message());
            setSuccessMsg(null);
        }
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
        if (cPassword !== '') {
            confirmPasswordsMatch(event.target.value, cPassword);
        }
    }

    function handleChangeConfirmPassword(event) {
        setCPassword(event.target.value);
        confirmPasswordsMatch(password, event.target.value);
    }

    function handleChangeFirstName(event) {
        setFirstName(event.target.value);
    }

    function handleChangeLastName(event) {
        setLastName(event.target.value);
    }

    function confirmPasswordsMatch(password, cPassword) {
        if (password === cPassword) {
            setValidConfirmPassword(true);
        } else {
            setValidConfirmPassword(false);
        }
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
        <form className="SignUpForm" onSubmit={updateUser}>
            {successMsg != null && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg != null && <div className="alert alert-danger">{errorMsg}</div>}
            <label className="form-label" htmlFor="signUpUsernameField">Email:</label>
            <input id="signUpUsernameField" className="form-control disabled" type="text" readOnly value={username} name="username"/>
            <div className="invalid-feedback d-none">
                <p>Invalid Email</p>
            </div>

            <label className="form-label" htmlFor="signUpFirstNameField" >First name:</label>
            <input id="signUpFirstNameField" className="form-control" type="text" value={firstName} name="firstName" onChange={handleChangeFirstName} />
            <div className="invalid-feedback d-none">
                <p>Invalid first name</p>
            </div>

            <label className="form-label" htmlFor="signUpLastNameField" >Last name:</label>
            <input id="signUpLastNameField"  className="form-control" type="text" value={lastName} name="lastName" onChange={handleChangeLastName} />
            <div className="invalid-feedback d-none">
                <p>Invalid last name</p>
            </div>

            <label className="form-label mt-3" htmlFor="signUpPasswordField" >Password:</label>
            <input id="signUpPasswordField" className="form-control" type="password" value={password} name="password" onChange={handleChangePassword} />
            <div className="invalid-feedback d-none">
                <p>Invalid password</p>
            </div>

            <label className="form-label mt-3" htmlFor="signUpConfirmPasswordField" >Confirm password:</label>
            <input id="signUpConfirmPasswordField" className="form-control" type="password" value={cPassword} name="cPassword" onChange={handleChangeConfirmPassword} />
            <FormErrorMsg condition={validConfirmPassword} text="Passwords must match" />

            <div><a className="small" href="/forgot-password">Forgot Password</a></div>
            <input className="btn btn-primary mt-3 d-block" type="submit" value="Submit" />
            <input className="btn btn-danger mt-3" type="button" value="Delete Account" onClick={deleteAccount} />
        </form>
    );
}

export default EditProfileForm;