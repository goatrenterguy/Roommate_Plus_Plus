import SignInPage from "../../Pages/SignInPage";
import SignUpPage from "../../Pages/SignUpPage";

function getHiddenRouteData() {
    return [
        {text: "Sign In", href: "/signIn", element: <SignInPage/>},
        {text: "Sign Up", href: "/signUp", element: <SignUpPage/>}
    ];
}

export default getHiddenRouteData();