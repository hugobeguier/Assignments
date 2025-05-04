import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";


export default function Quiz () {
   
    const { id } = useParams();
    const [quiz, setQuiz] = useState([]);
    /*
        - Add so a user cant answer if they arent logged in 
        - When writing feedback the feedback will be a popup that the user can see on their profile 
        - Make a "check answer button" pop up where you can see other users answers
    */

    useEffect (() => {
        const getQuiz = async () => {
            await fetch(`http://localhost:4000/get-quiz/${id}`)
            .then (async (data) => {
                const response = await data.json();
                setQuiz(response);
            }) 
        }  
        
        getQuiz();
                
    },[]);
   
    return (
        <div>
            <h1>{quiz.title}</h1>
            <p>{quiz.quiz}</p>
            <textarea>
            {/* set Answer object */}
            </textarea>
            <button>Send answer</button>
            <button>View other people answers</button>
        </div>
    );
}