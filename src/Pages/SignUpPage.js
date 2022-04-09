import {useState} from "react";
import {useNavigate} from "react-router-dom";
import SignUpForm from "../Components/Login/Forms/SignUpForm";

function SignUpPage(props) {
    const [errorMsg, setErrorMsg] = useState(undefined);
    const navigate = useNavigate();

    return (
        <main className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-sm-11 col-md-6 col-lg-4 card mt-5 mb-5 m-auto">
                        <div className="card-body">
                            {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : null}
                            <SignUpForm handleFormChange={() => navigate("/signIn")} handleErrorMsg={(msg) => setErrorMsg(msg)}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default SignUpPage;