import { useState } from 'react';

import gissanamn6 from "./assets/Gissanamn6.jpg";
import Gissanamn1 from "./assets/Gissanamn1.jpg";
import Gissanamn2 from "./assets/Gissanamn2.jpg";
import Gissanamn3 from "./assets/Gissanamn3.png";
import Gissanamn4 from "./assets/Gissanamn4.jpg";
import gissanamn5 from "./assets/gissanamn5.jpg";
import gissakändis1 from "./assets/gissakändis1.jpg";
import gissakändis2 from "./assets/gissakändis2.jpg";
import gissakändis3 from "./assets/gissakändis3.jpg";
import gissakändis4 from "./assets/gissakändis4.jpg";
import gissakändis5 from "./assets/gissakändis5.jpg";
import gissakändis6 from "./assets/gissakändis6.webp";



const initialTeams = [
  { id: "t1", name: "Lag 1", points: 0 },
  { id: "t2", name: "Lag 2", points: 0 },
  { id: "t3", name: "Lag 3", points: 0 },
  { id: "t4", name: "Lag 4", points: 0 },
  { id: "t5", name: "Lag 5", points: 0 },
];

const data = [
  {
    category: "Länder",
    questions: [
      { value: 100, question: "Vilket land har flest sjöar?"},
      { value: 200, question: "Vilket lands flagga är inte rektangulär?" },
      { value: 400, question: "Vad är Islands nationalrätt?" },
      { value: 600, question: "Hur många invånare bor i Japan?" },
      { value: 800, question: "I vilket land har man hittat den äldsta dildon?" },
      { value: 1000, question: "Vilket var det första landet i världen?" }
    ]
  },
  {
    category: "Gissa namn och ålder på kändisar",
    questions: [
      { value: 100, question: "", image: Gissanamn1 },
      { value: 200, question: "", image: Gissanamn2 },
      { value: 400, question: "", image: Gissanamn3 },
      { value: 600, question: "", image: Gissanamn4 },
      { value: 800, question: "", image: gissanamn5 },
      { value: 1000, question: "", image: gissanamn6 }
    ]
  },
  {
    category: "Allmänbildning om Alicia och Saga",
    questions: [
      { value: 100, question: "När fyller Alicia och Saga år?" },
      { value: 200, question: "Vad heter Saga och Alicias syskon?" },
      { value: 400, question: "När tog Alicia och Saga körkort? Datum och år." },
      { value: 600, question: "Vilket datum åkte Alicia till Japan? Datum och år." },
      { value: 800, question: "Vilket datum åkte Saga till Skottland? Datum och år." },
      { value: 1000, question: "Vad hette Alicia och Sagas avdelningar på dagis?" }
    ]
  },
  {
    category: "Gissa kändisen",
    questions: [
      { value: 100, question: "", image: gissakändis1 },
      { value: 200, question: "", image: gissakändis2 },
      { value: 400, question: "", image: gissakändis3 },
      { value: 600, question: "", image: gissakändis5 },
      { value: 800, question: "", image: gissakändis4 },
      { value: 1000, question:"", image: gissakändis6 },
    ]
  },
  {
    category: "Onödig fakta",
    questions: [
      { value: 100, question: "Vilket djur kan inte hoppa?" },
      { value: 200, question: "Hur lång tid tar det för en ananas att växa?" },
      { value: 400, question: "Hur mycket godis äter en svensk i snitt per år?" },
      { value: 600, question: "Vilken är den vanligaste födelsedagen i Sverige?"},
      { value: 800, question: "Hur många öar har Sverige?"},
      { value: 1000, question: "Hur många varv runt jorden går en människa i genomsnitt under sin livstid?" }
    ]
  },
  {
    category: "Kändisfödelsedagar",
    questions: [
      { value: 100, question: "När fyller Jesus år?" },
      { value: 200, question: "När fyller Kungen år?" },
      { value: 400, question: "När fyller Harry Styles år?" },
      { value: 600, question: "När fyller Pippi Långstrump år?" },
      { value: 800, question: "När fyller Elvis Presley år?" },
      { value: 1000, question: "När fyller Abraham Lincoln år?" }
    ]
  }
];


function App() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Teams + points
  const [teams, setTeams] = useState(initialTeams);

  // Which team is currently selected in the modal (for awarding points)
  const [selectedTeamId, setSelectedTeamId] = useState(initialTeams[0].id);

  // Map: questionKey -> teamId (meaning: this question has been scored for that team)
  const [answers, setAnswers] = useState({});

  const numRows = Math.max(...data.map((c) => c.questions.length));

  const adjustTeamPoints = (teamId, delta) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, points: t.points + delta } : t))
    );
  };

  const nextTeamId = (currentId) => {
    const idx = teams.findIndex((t) => t.id === currentId);
    const nextIdx = (idx + 1) % teams.length;
    return teams[nextIdx].id;
  };

  const markIncorrect = () => {
    if (!selectedQuestion) return;

    // Move turn to next team
    setSelectedTeamId((curr) => nextTeamId(curr));
    setSelectedQuestion(null)

  };

  const awardQuestionToTeam = (teamId) => {
    if (!selectedQuestion) return;

    const key = selectedQuestion.key;
    const value = selectedQuestion.value;

    const prevTeamId = answers[key];

    // If it was already awarded, remove the old award first
    if (prevTeamId) {
      adjustTeamPoints(prevTeamId, -value);
    }

    // If clicking same team again -> treat as "unmark"
    if (prevTeamId === teamId) {
      setAnswers((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setSelectedQuestion(null);
      return;
    }

    // Otherwise award to the chosen team
    adjustTeamPoints(teamId, value);
    setAnswers((prev) => ({ ...prev, [key]: teamId }));

    setSelectedTeamId(nextTeamId(teamId));

    setSelectedQuestion(null);
  };

  const getTeamName = (teamId) => teams.find((t) => t.id === teamId)?.name ?? "";

  return (
    <div className="bg-blue-900 min-h-screen flex flex-col items-center justify-start py-8 gap-4">
      {/* SCOREBOARD */}
      <div className="w-11/12 max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-2">
        {teams.map((t) => (
          <div
            key={t.id}
            className="bg-blue-800 text-yellow-300 rounded-lg p-3 text-center"
          >
            <div className="font-bold uppercase">{t.name}</div>
            <div className="text-2xl font-extrabold">{t.points}</div>
          </div>
        ))}
      </div>

      {/* JEOPARDY GRID */}
      <div
        className="grid gap-1 w-11/12 max-w-6xl"
        style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}
      >
        {data.map((cat, idx) => (
          <div
            key={idx}
            className="bg-blue-800 text-yellow-300 font-bold text-center p-2 uppercase text-sm md:text-lg"
          >
            {cat.category}
          </div>
        ))}

        {Array.from({ length: numRows }).map((_, rowIdx) =>
          data.map((cat, colIdx) => {
            const q = cat.questions[rowIdx];
            const key = `${colIdx}-${rowIdx}`;
            const isScored = answers[key] != null;

            return (
              <div
                key={key}
                className={`relative text-center p-6 cursor-pointer font-bold
                  ${isScored
                    ? "bg-green-700 text-white opacity-70 line-through"
                    : "bg-blue-700 text-yellow-400 hover:bg-blue-600"
                  } text-2xl md:text-3xl`}
                onClick={() =>
                  q && setSelectedQuestion({ ...q, key, category: cat.category })
                }
              >
                {q ? `${q.value}` : ""}
              </div>
            );
          })
        )}
      </div>

      {/* MODAL */}
      {selectedQuestion && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-900 bg-opacity-70">
          <div className="bg-white rounded-xl p-6 max-w-md text-center">
            <div className="text-xl font-bold uppercase text-blue-700 mb-2">
              {selectedQuestion.category}
            </div>

            {/* TEAM PICKER */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {teams.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTeamId(t.id)}
                  className={`px-3 py-2 rounded-lg font-bold
                    ${selectedTeamId === t.id
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <h2 className="text-xl font-bold mb-4">{selectedQuestion.question}</h2>

            {selectedQuestion.image && (
              <img
                src={selectedQuestion.image}
                alt="Frågebild"
                className="mx-auto mb-4 max-h-64 object-contain"
              />
            )}

            {answers[selectedQuestion.key] && (
              <div className="text-sm text-gray-700 mb-3">
                Poäng gavs till: <b>{getTeamName(answers[selectedQuestion.key])}</b>
              </div>
            )}

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setSelectedQuestion(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-300"
              >
                Stäng
              </button>

              <button
                onClick={markIncorrect}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Fel svar
              </button>

              <button
                onClick={() => awardQuestionToTeam(selectedTeamId)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
              >
                {answers[selectedQuestion.key] ? "Avmarkera" : "Markera"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;