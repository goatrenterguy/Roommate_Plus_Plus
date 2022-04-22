import MyProfilePage from "../../Pages/MyProfilePage";
import HouseholdPage from "../../Pages/HouseholdPage";

function getNavLinkData() {
    return [
        {text: "Page 1", href: "/page_1", element: <p>Page 1</p>},
        {text: "Page 2", href: "/page_2", element: <p>Page 2</p>},
        {text: "My Profile", href: "/profile", element: <MyProfilePage/>},
        {text: "Household", href: "/household", element: <HouseholdPage/>}
    ];
}

export default getNavLinkData();