import React, {useContext} from "react";
import {userContext} from "../Contexts/userContext";
import CreateJoinHousehold from "../Components/Household/CreateJoinHousehold";
import EditProfileForm from "../Components/Login/Forms/EditProfileForm";
import {Navigate} from "react-router-dom";

function HouseholdPage() {
    const userData = useContext(userContext).userData;
    const user = React.useContext(userContext).user;

    if (user) {
        if (userData === undefined) {
            return null;
        } else if (userData.householdID !== undefined) {
            return (
                <div className="container">
                    <div className="row-cols-md-2">
                        {/* Card for feed coming soon*/}
                        {/* Card for food */}
                        {/* Card for household members */}
                        {/* Card for household supplies */}
                    </div>
                </div>
            );
        } else {
            return (<CreateJoinHousehold/>);
        }
    } else if (user === undefined) {
        return (null);
    } else {
        return (<Navigate to={"/signIn"} replace={true}/>);
    }

}

export default HouseholdPage;