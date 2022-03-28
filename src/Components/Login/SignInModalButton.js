import SignInSignUpModal from "./SignInSignUpModal";
import React from 'react';

class SignInModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayModal: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({displayModal: !this.state.displayModal})
    }
    render() {
        return (
            <div className="ms-auto">
                <button className="btn btn-primary" onClick={this.handleClick}>Sign In</button>
                <SignInSignUpModal displayModal={this.state.displayModal} handleClick={this.handleClick}/>
            </div>
        );
    }
}

export default SignInModalButton;