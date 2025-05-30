import { useEffect, useState } from "react";
import { Form, Link, useParams } from "react-router-dom";


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
            <h1 className="text-4xl font-semibold text-center">{quiz.title}</h1>
            <div className="grid gap-2 flex flex-col m-4 ml-2 justify-center">
                <p className="ml-2 font-semibold">{quiz.quiz}</p>
                <textarea name="answer" placeholder="Answer..." className="text-justify mt-2 w-200 h-100 border-2 broder-gray-200 rounded-xl" style={{textAlign: 'left', paddingTop: '5px', paddingLeft: '5px'}}></textarea>
                <div className="">
                    <Link to="/" className="border rounded bg-blue-200 p-1 m-1">Send answer</Link>
                    <button to="/answers" className="border rounded bg-red-200 p-1 m-1 ">View other people answers</button>
                </div>
            </div>
            
            
        </div>
    );
}