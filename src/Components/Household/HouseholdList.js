import {API, graphqlOperation} from "aws-amplify";
import {listHouseholds} from "../../graphql/queries";
import {useEffect, useState} from "react";
import HouseholdCard from "./HouseholdCard";

function HouseholdList() {
    const [households, setHouseholds] = useState([]);

    useEffect(() => {
        fetchHouseholds();
    }, []);

    async function fetchHouseholds() {
        try {
            const householdsData = await API.graphql(graphqlOperation(listHouseholds));
            console.log(householdsData)
            setHouseholds(householdsData.data.listHouseholds.items);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-3" >
            {households.map((household, index) => {
                return (
                    <div className="col"  key={"col" + index}>
                        <HouseholdCard key={"household" + index} household={household}/>
                    </div>
                );
            })}
        </div>
    );
}

export default HouseholdList;