import React from "react";
import { Navigate } from 'react-router-dom';
import {userContext} from "../Contexts/userContext";

function MyProfilePage() {
    const user = React.useContext(userContext);
    if (user) {
        return (
            <main>
                <div className="container">
                    <p>{user.username}</p>
                </div>
            </main>
        );
    } else {
        return (<Navigate to={"/signIn"} replace={true}/>);
    }
}

export default MyProfilePage;