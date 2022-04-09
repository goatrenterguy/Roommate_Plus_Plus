import SignInForm from "../Components/Login/Forms/SignInForm";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

function SignInPage(props) {
    const [errorMsg, setErrorMsg] = useState(undefined);
    const navigate = useNavigate();

    return(
        <main>
            <div className="container">
                <div className="card w-25 m-auto mt-5 mb-5">
                    <div className="card-body">
                        {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : null }
                        <SignInForm handleFormChange={() => navigate("/signUp")} handleErrorMsg={(msg) => setErrorMsg(msg)} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignInPage;