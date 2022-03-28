import React from 'react';
import { Hub, Auth } from "aws-amplify";

class IsUserSignedIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            user: undefined
        };
        this.checkUser = this.checkUser.bind(this);
        this.setAuthListener = this.setAuthListener.bind(this);
    }

    componentDidMount() {
        this.checkUser();
        this.setAuthListener();
    }

    async setAuthListener() {
        Hub.listen("auth", (data) => {
            switch (data.payload.event) {
                case "signIn":
                    console.log(this.state.user + 'signed in');
                    this.checkUser()
                    break;
                case "signOut":
                    console.log("user signed out");
                    this.setState({'user': undefined, isLoggedIn: false})
                    break;
                default:
                    break;
            }
        });
    }

    async checkUser() {
        Auth.currentAuthenticatedUser()
            .then(user => this.setState({'user': user, 'isLoggedIn': true}))
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.isLoggedIn && !this.props.isFlipped) {
            return(this.props.children);
        } else if (!this.state.isLoggedIn && this.props.isFlipped){
            return(this.props.children);
        } else {
            return null;
        }
    }
}

IsUserSignedIn.defaultProps = {
    isFlipped: false
};

export default IsUserSignedIn;