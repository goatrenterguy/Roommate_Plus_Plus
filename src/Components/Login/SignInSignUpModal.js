import React from 'react';
import SignInForm from './SignInForm'
import SignUpForm from "./SignUpForm";

class SignInSignUpModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInForm: true
        }
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange() {
        this.setState({signInForm: !this.state.signInForm})
    }

    render() {
        if (this.props.displayModal) {
            let form = '';
            let title = '';
            if (this.state.signInForm) {
                form = <SignInForm handleFormChange={this.handleFormChange} />
                title = 'Sign In';
            } else {
                form = <SignUpForm handleFormCahnge={this.handleFormChange} />
                title = 'Sign Up';
            }
            return <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" aria-label="Close"
                                    onClick={() => this.props.handleClick()}/>
                        </div>
                        <div className="modal-body">
                            {form}
                        </div>
                    </div>
                </div>
            </div>;
        } else {
            return null;
        }
    }
}

export default SignInSignUpModal;