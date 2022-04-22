import {useState} from "react";

function HouseholdCard({household}) {
    const [householdMembers] = useState(household.householdMembers.items);
    const [householdItems] = useState(household.householdItems.items);

    // useEffect(() => {
    //     fetchHouseholdMembers();
    // }, []);
    //
    // async function fetchHouseholdMembers() {
    //     try {
    //         const householdMembersData = await API.graphql(graphqlOperation(getHousehold.members));
    //         console.log(householdMembersData)
    //         setHouseholdMembers(householdMembersData.data.listHouseholds.items);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <div className="card p-3">
            <div className="card-body">
                <h3>{household.name} </h3>
                <ul>
                    {householdMembers.map((member, index) => {
                        return (
                            <li key={"member" + index} >{member.name}</li>
                        );
                    })}
                </ul>
                <ul>
                    {householdItems.map((item, index) => {
                        return (
                            <li key={"item" + index} >{item.name}</li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default HouseholdCard;