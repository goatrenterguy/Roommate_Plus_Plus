import React from "react";
import { Navigate } from 'react-router-dom';
import {userContext} from "../Contexts/userContext";
import ChangePasswordForm from "../Components/Login/Forms/ChangePasswordForm";

function ChangePasswordPage() {
    const user = React.useContext(userContext).user;

    if (user) {
        return (
            <main>
                <div className="container pt-3">
                    <ChangePasswordForm/>
                </div>
            </main>
        );
    } else if (user === undefined) {
        return (null);
    } else {
        return (<Navigate to={"/signIn"} replace={true}/>);
    }
}

export default ChangePasswordPage;