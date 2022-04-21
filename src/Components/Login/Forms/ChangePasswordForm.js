import React, {useState} from "react";
import FormErrorMsg from "../FormErrorMsg";
import {Auth} from "aws-amplify";

function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    function confirmPasswordsMatch(password, cPassword) {
        if (password === cPassword) {
            setValidConfirmPassword(true);
        } else {
            setValidConfirmPassword(false);
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

    async function changePassword(event) {
        event.preventDefault();
        const user = await Auth.currentAuthenticatedUser();
        try {
            await Auth.changePassword(user, 'oldPassword', 'newPassword')
            setSuccessMsg("Password successfully changed");
        } catch (error) {
            setErrorMsg(error.message);
            console.log(error);
        }
    }

    function handleChangeOldPassword(event) {
        setOldPassword(event.target.value)
    }

    return (
        <form className="ChangePasswordForm" onSubmit={changePassword}>
            {successMsg != null && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg != null && <div className="alert alert-danger">{errorMsg}</div>}

            <label className="form-label mt-3" htmlFor="changePasswordOldPasswordField" >Old Password:</label>
            <input id="changePasswordOldPasswordField" className="form-control" type="password" value={oldPassword} name="password" onChange={handleChangeOldPassword} />
            <div className="invalid-feedback d-none">
                <p>Invalid password</p>
            </div>

            <label className="form-label mt-3" htmlFor="changePasswordPasswordField" >Password:</label>
            <input id="changePasswordPasswordField" className="form-control" type="password" value={password} name="password" onChange={handleChangePassword} />
            <div className="invalid-feedback d-none">
                <p>Invalid password</p>
            </div>

            <label className="form-label mt-3" htmlFor="changePasswordConfirmPasswordField" >Confirm password:</label>
            <input id="signUpConfirmPasswordField" className="form-control" type="password" value={cPassword} name="cPassword" onChange={handleChangeConfirmPassword} />
            <FormErrorMsg condition={validConfirmPassword} text="Passwords must match" />

            <input className="btn btn-primary mt-3 d-block" type="submit" value="Submit" />
        </form>
    );


}

export default ChangePasswordForm;