import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import InteractionsContext from "../contexts/InteractionsContext";


function User() {

    const { id } = useParams();
    const [user, setUser] = useState({});
    const {incrementCounter} = useContext(InteractionsContext);
    const hasIncremented = useRef(false);
    useEffect(() => {
            async function fetchPromises () {
                await fetch("https://dummyjson.com/users/" + id)
                    .then(async (data) => {
                        const response = await data.json();
                        setUser(response);
                    });
            }
    
        fetchPromises();
        if(!hasIncremented.current && incrementCounter){
            incrementCounter(id);
            hasIncremented.current = true;
        }
    }, [id,incrementCounter]);


  
    return (
        <>
            <div className="flex gap-8 items-center  p-4 bg-gray-300 rounded-xl">
                <img src={user.image} className="w-14" />
                <h1 className="font-semibold text-4xl">{user.firstName + " " + user.lastName}</h1>
            </div>
            <div className="flex flex-col p-4 bg-gray-300 rounded-xl mt-4 font-semibold">
                    <h2>User Info: </h2>
                    <h3>{"Email: " + user.email} </h3>
                    <h3>{"Phone Number: " + user.phone} </h3>
                    <h3>{"Address: " +(user.address ? user.address.address : "N/A")} </h3>
            </div>
        </>
    );
}

export default User;