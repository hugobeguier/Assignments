import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home () {

    const [quizzes, setQuizzes] = useState([]);

    const logout = () => {
        localStorage.removeItem("token");
        
    }

    useEffect(() => {
        const getQuizzes = async () => {
            await fetch('http://localhost:4000/get-quizzes')
            .then (async(data) => {
                const response = await data.json();
                setQuizzes(response);
            })
        }

        getQuizzes();

    },[]);

    // useEffect(() => {

    //     const getSecret = async () => {

    //         await fetch("http://localhost:4000/secret-sauce", {
    //             method: "GET",
    //             headers: {
    //                 "x-access-token": localStorage.getItem("token")
    //             }
    //         }).then(async (data) => {

    //             const response = await data.json();

    //             if (response.secretSauce) {
    //                 setSecret(response.secretSauce);
    //             }

    //         });

    //     };

    //     getSecret();

    // }, []);

    return (
        <main className="flex flex-col gap-6 px-24 py-8">
            <h1 className="text-4xl font-semibold">
                Quizzes
            </h1>
            {/* {secret ?
                <p>{secret}</p>
                : <p> Login to your account to be able to submit your answer to these Quizzes! </p>
            }
            <div className="flex gap-4">
                {secret ? (
                    <button onClick={logout} className="underline font-semibold">Logout</button>
                    ) : (<><Link to="/register" className="underline font-semibold">Register</Link>
                    <p>or</p>
                    <Link to="/login" className="underline font-semibold">Login</Link></>
                )}
                
            </div> */}

            <div className="grid gap-10 pt-8 max-w-4xl mx-auto">
                
                {quizzes.map((quiz, index) => (
                    <div className="border rounded-xl flex flex-col gap4" key={index}> 
                        <h3 className="text-center text-2xl font-bold mx-auto px-2 py-1 mt-2">
                            {quiz.title}
                        </h3>
                        {}
                        <Link to={`/quiz/${quiz.id}`} className="bg-blue-200 px-4 py-2 text-center rounded-xl mb-2 mx-auto">
                            Take Quiz
                        </Link>
                    </div>
                ))}
            </div>    
        </main>
    );
}