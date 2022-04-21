import HouseholdList from "../Components/Household/HouseholdList";
import CreateHousehold from "../Components/Household/CreateHousehold";

function HouseholdPage(){
    return (
        <div className="container">
            <CreateHousehold />
            <HouseholdList/>
        </div>
    );
}

export default HouseholdPage;