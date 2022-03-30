import { Auth } from 'aws-amplify';
import React from 'react';

class SignOutButton extends React.Component {
    async signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    render() {
        return (
            <button className="btn btn-secondary ms-auto" onClick={this.signOut}>Sign Out</button>
        );
    }
}

export default SignOutButton;