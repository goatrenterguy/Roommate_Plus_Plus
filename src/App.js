import './App.css';
import {Authenticator} from '@aws-amplify/ui-react';
import PrimaryTopNav from "./TopNav/PrimaryTopNav";


function App() {
    return (
        <main>
            <PrimaryTopNav/>
        </main>
        // <Authenticator>
        //     {({ signOut, user }) => (
        //         <main>
        //             <h1>Hello {user.username}</h1>
        //             <button onClick={signOut}>Sign out</button>
        //         </main>
        //     )}
        // </Authenticator>
    );
}

export default App;