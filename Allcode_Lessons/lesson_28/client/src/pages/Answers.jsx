import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Answers ({ canAnswerQuizzes, logout }) {
   
    const { id } = useParams();
    const [quiz, setQuiz] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [userId, setUserId] = useState([null]);

    useEffect (() => {
        const getQuiz = async () => {
            await fetch(`http://localhost:4000/get-quiz/${id}`)
            .then (async (data) => {
                const response = await data.json();
                setQuiz(response);
            }) 
        }  
        
        getQuiz();
        
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.userId);
        }

    },[id]);

   const sendAnswer = async () => {
        if(!userId) {
            alert("You need to be logged in to submit an answer.");
        }
        const answerData = {
            textField: answer,
            userId: userId,
            quizId: id,
        };

        await fetch (`http://localhost:4000/post-answer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(answerData),
        })
        .then ((response) => response.json())
        .then ((data) => {
            if (data.success) {
                alert("Your answer has been submitted!");
            }
            else {
                alert("Error submitting your answer.");
            }
        })
        .catch((err) => {
            console.error("Error: ", err);
            alert("An error occurred");
        });
   };
   
    return (
        <main>
            <div className="">
                {canAnswerQuizzes ? (
                    <><div className="flex justify-between items-start p-2">
                        <div className="flex flex-col">
                            <p className="mt-2">You are logged in</p>
                            <button onClick={logout} className="underline font-semibold w-max hover:text-red-600">
                                Logout
                            </button>
                        </div>

                        <div className="mt-6 mr-2">
                            <Link to="/" className="border w-max rounded p-2 bg-gray-100 hover:bg-gray-200 font-semibold">
                                Home Page
                            </Link>
                        </div>
                    </div></>
                    ) : (<div className="justify-start flex gap-4 ml-4 mt-2">
                            <Link to="/register" className="underline font-semibold">Register</Link>
                            <p>or</p>
                            <Link to="/login" className="underline font-semibold">Login</Link>
                        </div>
                )}

                <h1 className="text-4xl font-semibold text-center">{quiz.title}</h1>
                <div className="grid gap-2 flex flex-col m-4 ml-2 justify-center">
                    <p className="ml-2 font-semibold">{quiz.quiz}</p>
                    {canAnswerQuizzes ? (
                        <div>
                            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} name="answer" placeholder="Answer..." className="text-justify mt-2 w-200 h-100 border-2 broder-gray-200 rounded-xl" style={{textAlign: 'left', paddingTop: '5px', paddingLeft: '5px'}}></textarea>
                            <div className="">
                                <Link onClick={sendAnswer} className="border rounded bg-blue-200 p-1 m-1">Submit answer</Link>
                                <button to="/answers" className="border rounded bg-red-200 p-1 m-1 ">View other people answers</button>
                            </div>
                        </div>    
                    ) : (
                        <p className="font-semibold p-1 m-1">You need to log in or register to answer this quiz</p>
                    )}
                </div>
            </div>
        </main>

        
    );
}