import { Auth } from 'aws-amplify';
import React from 'react';
import {useNavigate} from "react-router-dom";

function SignOutButton() {
    const navigate = useNavigate();
    async function signOut() {
        try {
            await Auth.signOut();
            navigate("/", { replace: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <button className="btn btn-secondary ms-auto" onClick={signOut}>Sign Out</button>
    );
}

export default SignOutButton;