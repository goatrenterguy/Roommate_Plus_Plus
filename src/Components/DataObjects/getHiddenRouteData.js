import SignInPage from "../../Pages/SignInPage";
import SignUpPage from "../../Pages/SignUpPage";
import ChangePasswordPage from "../../Pages/ChangePasswordPage";

function getHiddenRouteData() {
    return [
        {text: "Sign In", href: "/signIn", element: <SignInPage/>},
        {text: "Sign Up", href: "/signUp", element: <SignUpPage/>},
        {text: "Change Password", href: "/changePassword", element: <ChangePasswordPage/>},
    ];
}

export default getHiddenRouteData();