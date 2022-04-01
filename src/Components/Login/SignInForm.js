import React from 'react'
import { Auth } from 'aws-amplify'
import {Link} from "react-router-dom";
class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : ''
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const user = await Auth.signIn(this.state.username, this.state.password);
            console.log({user})
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    render() {
        return (
            <form className="LoginForm" onSubmit={this.handleSubmit}>
                <label className="form-label" htmlFor="loginUsernameField">Email:</label>
                <input id="loginUsernameField" className="form-control" type="text" value={this.state.username} name="username" onChange={this.handleChangeUsername} />
                <label className="form-label mt-3" htmlFor="loginPasswordField" >Password:</label>
                <input id="loginPasswordField" className="form-control" type="password" value={this.state.password} name="password" onChange={this.handleChangePassword} />
                <div><Link className="small" to="/forgot-password">Forgot Password</Link></div>
                <div className="d-grid g-2 gap-2 d-md-block mt-3">
                    <button className="btn btn-primary me-md-1" type="submit" >Login</button>
                    <button className="btn btn-secondary" type="button" onClick={() => this.props.handleFormChange()}>Sign Up</button>
                </div>
            </form>
        );
    }
}

export default SignInForm;