import React from "react";
import { Navigate } from 'react-router-dom';
import {userContext} from "../Contexts/userContext";
import EditProfileForm from "../Components/Login/Forms/EditProfileForm";

function MyProfilePage() {
    const user = React.useContext(userContext).user;

    if (user) {
        return (
            <main>
                <div className="container pt-3">
                    <h1> Hi {user.attributes.given_name}, </h1>
                    <EditProfileForm/>
                </div>
            </main>
        );
    } else if (user === undefined) {
        return (null);
    } else {
        return (<Navigate to={"/signIn"} replace={true}/>);
    }
}

export default MyProfilePage;