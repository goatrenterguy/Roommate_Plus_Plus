import React from 'react';
import {Link} from "react-router-dom";
import {Auth} from "aws-amplify";
import LoadingSpinner from "../Utilities/LoadingSpinner";

class ConfirmSignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : props.username,
            code : '',
            isLoading : false,
        }
        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.confirmSignUp = this.confirmSignUp.bind(this);
    }

    render() {
        if (this.state.isLoading) {
            return (<LoadingSpinner/>);
        } else {
            return (
                <form className="ConfirmSignUpForm" onSubmit={this.confirmSignUp}>
                    <label className="form-label" htmlFor="loginUsernameField">Verification code:</label>
                    <input id="loginUsernameField" className="form-control" type="text" value={this.state.code}
                           name="username" onChange={this.handleChangeCode}/>
                    <div><Link className="small" to="/forgot-password">Resend Code</Link></div>
                    <div className="d-grid g-2 gap-2 d-md-block mt-3">
                        <button className="btn btn-primary me-md-1" type="submit">Verify</button>
                    </div>
                </form>
            );
        }
    }

    handleChangeCode(event) {
        this.setState({code : event.target.value});
    }

    async confirmSignUp(event) {
        event.preventDefault();
        this.setState({isLoading: true});
        try {
            await Auth.confirmSignUp(this.state.username, this.state.code);
            this.setState({isLoading: false});
            this.props.handleFormChange();
        } catch (error) {
            this.props.handleErrorMsg(error.message);
            this.setState({isLoading: false});
            console.log('error confirming sign up', error);
        }
    }
}

export default ConfirmSignUpForm;