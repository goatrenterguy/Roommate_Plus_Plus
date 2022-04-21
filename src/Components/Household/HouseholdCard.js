import {useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {getHousehold} from "../../graphql/queries";

function HouseholdCard({household}) {
    const [householdMembers, setHouseholdMembers] = useState([]);

    useEffect(() => {
        fetchHouseholdMembers();
    }, []);

    async function fetchHouseholdMembers() {
        try {
            const householdMembersData = await API.graphql(graphqlOperation(getHousehold.members));
            console.log(householdMembersData)
            setHouseholdMembers(householdMembersData.data.listHouseholds.items);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="card p-3">
            <div className="card-body">
                <h3>{household.name} </h3>
                <ul>
                    {householdMembers.map((member, index) => {
                        return (
                            <li key={"member" + index} >{member.userId}</li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default HouseholdCard;