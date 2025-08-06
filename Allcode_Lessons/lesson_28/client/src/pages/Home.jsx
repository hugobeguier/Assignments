import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Home ({ canAnswerQuizzes, logout }) {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const getQuizzes = async () => {
            await fetch('http://localhost:4000/get-quizzes', {
                method : "GET",
                headers: {
                    "Content-Type": "application/json",
                }             
            }).then (async(data) => {
                const response = await data.json();
                setQuizzes(response);
            })
        }

        getQuizzes();

    },[]);

    return (
        <main className="flex flex-col gap-6 px-24 py-8">
            <h1 className="text-4xl font-semibold">
                Quizzes
            </h1>
            {canAnswerQuizzes ?
                <p>You are logged in</p>
                : <p> Login to your account to be able to submit your answer to these Quizzes! </p>
            }
            <div className="flex gap-4">
                {canAnswerQuizzes ? (
                    <button onClick={logout} className="underline font-semibold">Logout</button>
                    ) : (<><Link to="/register" className="underline font-semibold">Register</Link>
                    <p>or</p>
                    <Link to="/login" className="underline font-semibold">Login</Link></>
                )}
                
            </div>

            <div className="grid gap-10 pt-8 max-w-4xl mx-auto">
                
                {quizzes.map((quiz, index) => (
                    <div className="border rounded-xl flex flex-col gap4" key={index}> 
                        <h3 className="text-center text-2xl font-bold mx-auto px-2 py-1 mt-2">
                            {quiz.title}
                        </h3>
                        <p>{canAnswerQuizzes ? "You can answer this quiz" : "Login to answer this quiz"}</p>
                        <Link to={`/quiz/${quiz.id}`} className="bg-blue-200 px-4 py-2 text-center rounded-xl mb-2 mx-auto">
                            View Quiz
                        </Link>
                    </div>
                ))}
            </div>    
        </main>
    );
}