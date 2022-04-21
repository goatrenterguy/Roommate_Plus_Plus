import React from 'react'
import { Auth } from 'aws-amplify'
import {Link} from "react-router-dom";
import LoadingSpinner from "../../Utilities/LoadingSpinner";
import ConfirmSignUpForm from "./ConfirmSignUpForm";
import {Navigate} from "react-router-dom";

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigate: undefined,
            confirmSignUp : false,
            isLoading : '',
            username : '',
            password : ''
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resendConfirmationCode = this.resendConfirmationCode.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    async resendConfirmationCode() {
        try {
            await Auth.resendSignUp(this.state.username);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.props.handleErrorMsg(undefined);
        this.setState({isLoading: true});
        try {
            const user = await Auth.signIn(this.state.username, this.state.password);
            this.setState({isLoading: false });
            console.log({user})
        } catch (error) {
            if (error.code === 'UserNotConfirmedException' ) {
                this.props.handleErrorMsg("User is not confirmed. A new verification code has been sent");
                this.setState({confirmSignUp: true});
                await this.resendConfirmationCode();
            }
            this.setState({isLoading: false });
            this.props.handleErrorMsg(error.message);
            console.log('error signing in', error);
        }
    }

    render() {
        if (this.state.isLoading) {
            return (<LoadingSpinner text={"Signing in..."}/>);
        } else if (this.state.confirmSignUp) {
            return (<ConfirmSignUpForm handleFormChange={this.props.handleFormChange} username={this.state.username} handleErrorMsg={this.props.handleErrorMsg}/>);
        } else if (this.state.navigate) {
            return (<Navigate to={"/"} replace={true}/>);
        } else {
            return (
                <form className="LoginForm" onSubmit={this.handleSubmit}>
                    <label className="form-label" htmlFor="loginUsernameField">Email:</label>
                    <input id="loginUsernameField" className="form-control" type="text" value={this.state.username}
                           name="username" onChange={this.handleChangeUsername}/>
                    <label className="form-label mt-3" htmlFor="loginPasswordField">Password:</label>
                    <input id="loginPasswordField" className="form-control" type="password" value={this.state.password}
                           name="password" onChange={this.handleChangePassword}/>
                    <div><Link className="small" to="/forgot-password">Forgot Password</Link></div>
                    <div className="d-grid g-2 gap-2 d-md-block mt-3">
                        <button className="btn btn-primary me-md-1" type="submit">Login</button>
                        <button className="btn btn-secondary" type="button"
                                onClick={() => this.props.handleFormChange()}>Sign Up
                        </button>
                    </div>
                </form>
            );
        }
    }
}

export default SignInForm;