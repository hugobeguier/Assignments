import { useState } from 'react';

const initialTeams = [
  { id: "t1", name: "Lag 1", points: 0 },
  { id: "t2", name: "Lag 2", points: 0 },
  { id: "t3", name: "Lag 3", points: 0 },
  { id: "t4", name: "Lag 4", points: 0 },
  { id: "t5", name: "Lag 5", points: 0 },
];

const data = [
  {
    category: "Filmer",
    questions: [
      { value: 100, question: "Vilken clown terroriserar barnen i staden Derry i Stephen Kings \"It\"?", answer: "Pennywise" },
      { value: 200, question: "Vilken film från 1993 handlar om tre häxsystrar som väcks till liv på Halloween i Salem?", answer: "Hocus Pocus" },
      { value: 400, question: "Vilken film från 1999 har repliken \"I see dead people\"?", answer: "The Sixth Sense" },
      { value: 600, question: "Vilken skådespelare spelade Hannibal Lecter i \"När lammen tystnar\"?", answer: "Anthony Hopkins" },
      { value: 800, question: "Vad heter platsen där filmen \"Fredagen den 13:e\" utspelar sig?", answer: "Camp Crystal Lake" },
      { value: 1000, question: "Vilket år kom den första Scream-filmen?", answer: "1996" }
    ]
  },
  {
    category: "Karaktärer",
    questions: [
      { value: 100, question: "Vilken vampyr skapades av författaren Bram Stoker?", answer: "Dracula" },
      { value: 200, question: "Vilken karaktär bär hockeymask i Fredagen den 13:e?", answer: "Jason Voorhees" },
      { value: 400, question: "Vad heter den besatta dockan i filmen Child's Play?", answer: "Chucky" },
      { value: 600, question: "Vad heter vampyrjägaren i Bram Stokers roman \"Dracula\"?", answer: "Van Helsing" },
      { value: 800, question: "Vilken skräckfilmskaraktär spelades av Robert Englund?", answer: "Freddy Krueger" },
      { value: 1000, question: "Vad heter Jigsaw-mördaren i Saw-filmerna egentligen, det vill säga hans riktiga namn?", answer: "John Kramer" }
    ]
  },
  {
    category: "Halloween Fakta",
    questions: [
      { value: 100, question: "Vilket land flyttade irländska invandrare från på 1800-talet och tog med sig Halloween till USA?", answer: "Irland" },
      { value: 200, question: "Vilken stad i Massachusetts är känd för sina häxprocesser?", answer: "Salem" },
      { value: 400, question: "Vad markerade Samhain för kelterna?", answer: "Slutet på sommaren och början på vintern" },
      { value: 600, question: "Vilken rotfrukt använde man från början till lyktor i Irland, innan pumpan?", answer: "Majrova" },
      { value: 800, question: "Varför klädde kelterna ut sig under Samhain?", answer: "För att skrämma bort eller smälta in bland onda andar" },
      { value: 1000, question: "Vad är \"Halloween\" en förkortning av?", answer: "All Hallows' Eve (allhelgonaafton)" }
    ]
  },
  {
    category: "Halloween runt om i världen",
    questions: [
      { value: 100, question: "Vilket land firar Día de los Muertos (de dödas dag)?", answer: "Mexiko" },
      { value: 200, question: "I vilket land ligger Transsylvanien, som förknippas med Dracula?", answer: "Rumänien" },
      { value: 400, question: "Vilket land firar Ognissanti den 1 november, med krysantemum på gravarna?", answer: "Italien" },
      { value: 600, question: "Vilket land firar Hungry Ghost Festival, där man bränner offergåvor till andarna?", answer: "Kina" },
      { value: 800, question: "Vilket land har traditionen Famadihana, där familjer tar upp sina döda släktingar ur gravarna och dansar med dem?", answer: "Madagaskar" },
      { value: 1000, question: "Hur många ton godis säljs ungefär i USA under Halloween?", answer: "Cirka 270 000 ton" }
    ]
  },
  {
    category: "Sägner",
    questions: [
      { value: 100, question: "Vilket monster sägs bo i en skotsk sjö?", answer: "Odjuret i Loch Ness (Nessie)" },
      { value: 200, question: "Vilket väsen i svensk folktro spelar fiol vid vattendrag och lockar människor?", answer: "Näcken" },
      { value: 400, question: "Vad kallas den stora, håriga varelsen som sägs bo i Nordamerikas skogar?", answer: "Bigfoot (Sasquatch)" },
      { value: 600, question: "Vilken kvinnlig skogsvarelse i svensk folktro är vacker framifrån men ihålig i ryggen?", answer: "Skogsrået" },
      { value: 800, question: "Vad kallas varelsen i svensk folktro som sägs sitta på människors bröst och ge dem mardrömmar?", answer: "Mara" },
      { value: 1000, question: "Vilken varelse sägs suga blod från getter i Latinamerika?", answer: "Chupacabra" }
    ]
  },
  {
    category: "Musik",
    questions: [
      { value: 100, question: "Vilken artist sjöng \"Thriller\"?", answer: "Michael Jackson" },
      { value: 200, question: "Vilken artist har gjort låten \"Bury a Friend\"?", answer: "Billie Eilish" },
      { value: 400, question: "Vilken film har ett temaljud som består av bara två toner som spelas om och om igen?", answer: "Hajen (Jaws)" },
      { value: 600, question: "Vilket band sjöng \"Sympathy for the Devil\" 1968?", answer: "The Rolling Stones" },
      { value: 800, question: "Vilken artist kallas \"Prince of Darkness\"?", answer: "Ozzy Osbourne" },
      { value: 1000, question: "Vilket år kom albumet Thriller?", answer: "1982" }
    ]
  }
];


function App() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

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
      <div className="w-11/12 max-w-6xl grid grid-cols-2 md:grid-cols-5 gap-2">
        {teams.map((t) => (
          <div
            key={t.id}
            className={`rounded-lg p-3 text-center transition-all ${
              selectedTeamId === t.id
                ? "bg-yellow-400 text-blue-900 ring-4 ring-white scale-105 shadow-lg"
                : "bg-blue-800 text-yellow-300"
            }`}
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
                onClick={() => {
                  if (!q) return;
                  setShowAnswer(false);
                  setSelectedQuestion({ ...q, key, category: cat.category });
                }}
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

            {selectedQuestion.answer && (
              showAnswer ? (
                <div className="text-lg font-bold text-green-700 mb-4">
                  Svar: {selectedQuestion.answer}
                </div>
              ) : (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-4 py-2 mb-4 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-300"
                >
                  Visa svar
                </button>
              )
            )}

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
