import React from 'react'
import { Auth } from 'aws-amplify'
import FormErrorMsg from "../FormErrorMsg";
import LoadingSpinner from "../../Utilities/LoadingSpinner";
import ConfirmSignUpForm from "./ConfirmSignUpForm";

// TODO: Form validation
class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : false,
            confirmSignUp : false,
            username : '',
            password : '',
            cPassword : '',
            firstName : '',
            lastName : '',
            validUsername : true,
            validPassword : true,
            validFirstName : true,
            validLastName : true,
            validConfirmPassword : true,
        };
        this.signUp = this.signUp.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.confirmPasswordsMatch = this.confirmPasswordsMatch.bind(this);
        this.loadingDom = this.loadingDom.bind(this);
        this.confirmSignUpDom = this.confirmSignUpDom.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
        if (this.state.cPassword !== '') {
            this.confirmPasswordsMatch(this.state.cPassword, event.target.value);
        }
    }

    handleChangeConfirmPassword(event) {
        this.setState({cPassword: event.target.value});
        this.confirmPasswordsMatch(this.state.password, event.target.value);
    }

    handleChangeFirstName(event) {
        this.setState({firstName: event.target.value});
    }

    handleChangeLastName(event) {
        this.setState({lastName: event.target.value});
    }

    confirmPasswordsMatch(password, cPassword) {
        if (password === cPassword) {
            this.setState({validConfirmPassword: true});
        } else {
            this.setState({validConfirmPassword: false});
        }
    }

    async signUp(event) {
        event.preventDefault();
        this.setState({loading: true});
        try {
            const { user } = await Auth.signUp({
                username: this.state.username,
                password: this.state.password,
                attributes: {
                    given_name: this.state.firstName,
                    family_name: this.state.lastName,
                    name: this.state.firstName + " "  + this.state.lastName
                }});
            this.setState({loading: false, confirmSignUp: true});
            console.log(user);
        } catch (error) {
            this.setState({loading: false});
            this.props.handleErrorMsg(error.message);
            console.log('error signing up:', error);
        }
    }

    loadingDom() {
        return (<LoadingSpinner text={"Signing up..."}/>);
    }

    confirmSignUpDom() {
        return (
            <ConfirmSignUpForm handleFormChange={this.props.handleFormChange} username={this.state.username} handleErrorMsg={this.props.handleErrorMsg}/>
        );
    }

    signUpFormDom() {
        return (<form className="SignUpForm" onSubmit={this.signUp}>
                <label className="form-label" htmlFor="signUpUsernameField">Email:</label>
                <input id="signUpUsernameField" className="form-control" type="text" value={this.state.username} name="username" onChange={this.handleChangeUsername} />
                <div className="invalid-feedback d-none">
                    <p>Invalid Email</p>
                </div>

                <label className="form-label" htmlFor="signUpFirstNameField" >First name:</label>
                <input id="signUpFirstNameField" className="form-control" type="text" value={this.state.firstName} name="firstName" onChange={this.handleChangeFirstName} />
                <div className="invalid-feedback d-none">
                    <p>Invalid first name</p>
                </div>

                <label className="form-label" htmlFor="signUpLastNameField" >Last name:</label>
                <input id="signUpLastNameField"  className="form-control" type="text" value={this.state.lastName} name="lastName" onChange={this.handleChangeLastName} />
                <div className="invalid-feedback d-none">
                    <p>Invalid last name</p>
                </div>

                <label className="form-label mt-3" htmlFor="signUpPasswordField" >Password:</label>
                <input id="signUpPasswordField" className="form-control" type="password" value={this.state.password} name="password" onChange={this.handleChangePassword} />
                <div className="invalid-feedback d-none">
                    <p>Invalid password</p>
                </div>

                <label className="form-label mt-3" htmlFor="signUpConfirmPasswordField" >Confirm password:</label>
                <input id="signUpConfirmPasswordField" className="form-control" type="password" value={this.state.cPassword} name="cPassword" onChange={this.handleChangeConfirmPassword} />
                <FormErrorMsg condition={this.state.validConfirmPassword} text="Passwords must match" />

                <div><a className="small" href="/forgot-password">Forgot Password</a></div>
                <input className="btn btn-primary mt-3" type="submit" value="Submit" />
            </form>
        );
    }

    render() {
        if (this.state.loading) {
            return(this.loadingDom());
        }  else if (this.state.confirmSignUp) {
            return (this.confirmSignUpDom());
        } else {
            return (this.signUpFormDom());
        }
    }
}

export default SignUpForm;