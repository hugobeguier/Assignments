import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
//import Answers from "./pages/Answers";

function App() {

    const [canAnswerQuizzes, setCanAnswerQuizzes] = useState("");

    useEffect(() => {
        const getToken = async () => {
            try {
                await fetch('http://localhost:4000/answer-quizzes', {
                    method : "GET",
                    headers: {
                        "x-access-token": localStorage.getItem("token")
                    }
                }).then (async(data) => {
                    const response = await data.json();
               
                    if (response.answerQuizzes) {
                        setCanAnswerQuizzes(response.answerQuizzes);
                    }
                })
            } catch (err) {
                console.error("Error: ", err);
            }
        }

        getToken();

    },[]);

    const logout = () => {
          localStorage.removeItem("token");
          setCanAnswerQuizzes("");
    }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home canAnswerQuizzes={canAnswerQuizzes} logout={logout} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setCanAnswerQuizzes={setCanAnswerQuizzes} />} />
        <Route path = "/quiz/:id" element={<Quiz canAnswerQuizzes={canAnswerQuizzes} logout={logout} />} />
        {/*<Route path = "/answers" element={<Answers canAnswerQuizzes={canAnswerQuizzes} logout={logout} />} />*/}
      </Routes>
    </>
  );
}

export default App;
