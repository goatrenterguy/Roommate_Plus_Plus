import React from 'react';
import SignInForm from './Forms/SignInForm'
import SignUpForm from "./Forms/SignUpForm";

class SignInSignUpModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInForm: props.signIn,
            errorMsg: undefined,
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.closeButton = this.closeButton.bind(this);
        this.handleErrorMsg = this.handleErrorMsg.bind(this);
    }

    handleFormChange() {
        this.setState({signInForm: !this.state.signInForm})
        this.setState({errorMsg: undefined});
    }
    
    handleErrorMsg(msg) {
        this.setState({errorMsg: msg});
    } 
    
    closeButton() {
        this.props.handleClick();
        this.setState({signInForm: this.props.signIn});
        this.setState({errorMsg: undefined});
    }

    render() {
        if (this.props.displayModal) {
            let form = '';
            let title = '';
            let error = '';
            if (this.state.errorMsg !== undefined) {
                error = <div className="alert alert-danger">{this.state.errorMsg}</div>
            }
            if (this.state.signInForm) {
                form = <SignInForm handleFormChange={this.handleFormChange} handleErrorMsg={this.handleErrorMsg} />
                title = 'Sign In';
            } else {
                form = <SignUpForm handleFormChange={this.handleFormChange} handleErrorMsg={this.handleErrorMsg} />
                title = 'Sign Up';
            }
            return (
                <div className="modal d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={this.closeButton}/>
                            </div>
                            <div className="modal-body">
                                {error}
                                {form}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default SignInSignUpModal;