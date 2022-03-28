import React from 'react'
import { Auth } from 'aws-amplify'
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
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={this.state.username} name="username" onChange={this.handleChangeUsername} />
                </label>
                <label>
                    Password:
                    <input type="password" value={this.state.password} name="password" onChange={this.handleChangePassword} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default SignInForm;