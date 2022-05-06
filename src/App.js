import './App.css';
import PrimaryTopNav from "./Components/TopNav/PrimaryTopNav";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import React, {useEffect, useState} from "react";
import getHiddenRouteData from "./Components/DataObjects/getHiddenRouteData";
import getNavLinkData from "./Components/DataObjects/getNavLinkData";
import Home from "./Pages/Home";
import {API, Auth, Hub} from "aws-amplify";
import {userContext} from "./Contexts/userContext";
import {getUser} from "./graphql/queries";
import {createUser, updateUser} from "./graphql/mutations";

function App() {
    const [user, setUser] = useState(undefined);
    const [userData, setUserData] = useState(undefined);

    function loadRoutes() {
        let routeDoms = [];
        let id = 0;
        function getLinkDoms(value) {
            routeDoms.push(<Route path={value.href} element={value.element} key={"Route" + id}/>);
            id++;
        }
        let routes = [...getHiddenRouteData, ...getNavLinkData];
        routes.forEach(getLinkDoms);
        return routeDoms;
    }

    async function updateUserData() {
        await Auth.currentAuthenticatedUser().then(async (user) => {
            const userData = {
                id: user.username,
                name: user.attributes.name,
                firstName: user.attributes.given_name,
                lastName: user.attributes.family_name
            }
            console.log(userData);
            try {
                const updatedUser = await API.graphql({
                    query: updateUser,
                    variables: {input: userData},
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });
                console.log("User updated: ", updatedUser.data.updateUser);
                setUserData(updatedUser.data.updateUser);
                await checkUser();
            } catch (error) {
                console.log(error);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getUserData(user) {
        try {
            let userID = user.username.toString();
            console.log(userID);
            let uData = await API.graphql(
                {
                    query: getUser,
                    variables: {
                        id: userID
                    },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });
            if (uData.data.getUser === null) {
                uData = createUserData(user);
            }
            setUserData(uData.data.getUser);
            console.log(uData);
        } catch (error) {
            console.log(error);
        }
    }

    async function checkUser() {
        Auth.currentAuthenticatedUser().then((u) => {
            setUser(u);
            getUserData(u);
            console.log(u);
        }).catch((error) => {
            setUser(null);
            console.log(error);
        });
    }

    useEffect(() => {
        checkUser();
        Hub.listen("auth", (data) => {
            switch (data.payload.event) {
                case "signIn":
                    checkUser();
                    break;
                case "signOut":
                    console.log("user signed out");
                    setUser(undefined);
                    break;
                case 'tokenRefresh':
                    updateUserData();
                    break;
                default:
                    console.log(data);
                    break;
            }
        });
    }, []);



    async function createUserData(user) {
        const userData = {
            id: user.username,
            name: user.attributes.name,
            firstName: user.attributes.given_name,
            lastName: user.attributes.family_name
        }
        console.log("New user data", userData);
        try {
            const newUser = await API.graphql({
                query: createUser,
                variables: {input: userData},
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
            console.log("New user", newUser);
            return newUser.data.createUser;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <userContext.Provider value={{user, userData}}>
            <BrowserRouter>
                <PrimaryTopNav/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {loadRoutes()}
                </Routes>
                <Footer/>
            </BrowserRouter>
        </userContext.Provider>
    );
}

export default App;