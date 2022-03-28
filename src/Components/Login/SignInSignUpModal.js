import React from 'react';
import SignInForm from './SignInForm'

class SignInSignUpModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInForm: true
        }
    }
    handleFormChange(state) {
        this.setState({signInForm: state})
    }
    render() {
        if (this.props.displayModal) {
            let form = ''
            if (this.state.signInForm) {
                form = <SignInForm/>
            }
            return <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Sign In</h5>
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