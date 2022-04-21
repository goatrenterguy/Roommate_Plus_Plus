import SignInForm from "../Components/Login/Forms/SignInForm";
import {Navigate, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {userContext} from "../Contexts/userContext";

function SignInPage() {
    const user = React.useContext(userContext);
    const [errorMsg, setErrorMsg] = useState(undefined);
    const navigate = useNavigate();

    if (user) {
        return (<Navigate to={"/profile"} replace={true}/>);
    } else if (user === undefined) {
        return null;
    } else {
        return (
            <main>
                <div className="container">
                    <div className="card w-25 m-auto mt-5 mb-5">
                        <div className="card-body">
                            {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : null}
                            <SignInForm handleFormChange={() => navigate("/signUp", { replace: true })} handleErrorMsg={(msg) => setErrorMsg(msg)}/>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default SignInPage;