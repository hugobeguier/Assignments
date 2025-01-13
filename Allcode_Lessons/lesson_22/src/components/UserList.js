import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InteractionsContext from "../contexts/InteractionsContext";

function UserList () {

    const [usersList, setUsersList] = useState([]);

    const { counters } = useContext(InteractionsContext);

    useEffect(() => {
        async function fetchPromises () {
            await fetch("https://dummyjson.com/users")
                .then(async (data) => {
                    const response = await data.json();
                    setUsersList(response.users);
                });
        }
        fetchPromises();
    }, []);


    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">User List</h1>
            <div className="flex flex-col gap-6">
                {usersList.map((user,index) => (
                    <User user={user} key={index} />
                ))}
            </div>
        </div>
    );
}

function User ( { user } ) {//Här har jag använt mig av något som heter Destructuring, packar ur arrayen för att ha direkt access till objektet.  
    
    const { counters }= useContext(InteractionsContext);
    
    return (
        <div className="flex flex-row items-center gap-4 justify-between p-4 bg-gray-300 rounded-xl">
            <img src={user.image} className="object-contain h-10 w-10 "/>
            <h3 className="text-xl font-semibold">{user.firstName + " " + user.lastName}</h3>
            <p className="text-xl">{"Visits: " + (counters[user.id] || 0)}</p>
            <Link to= {"/user/" + user.id} className=" ml-auto text-xl p-2 border border-gray-500 rounded-xl hover:bg-blue-300" >
                Go to user profile
            </Link>
        </div>
    );
}

export default UserList;