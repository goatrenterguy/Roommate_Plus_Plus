import './App.css';
import PrimaryTopNav from "./Components/TopNav/PrimaryTopNav";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import React, {useEffect, useState} from "react";
import getHiddenRouteData from "./Components/DataObjects/getHiddenRouteData";
import getNavLinkData from "./Components/DataObjects/getNavLinkData";
import Home from "./Pages/Home";
import {Auth, Hub} from "aws-amplify";
import {userContext} from "./Contexts/userContext";

function App() {
    const [user, setUser] = useState(null);

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
                default:
                    break;
            }
        });
    }, []);

    async function checkUser() {
        Auth.currentAuthenticatedUser().then((user) => {
            console.log(user);
            setUser(user);
        }).catch(err => console.log(err));
    }

    return (
        <userContext.Provider value={user}>
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