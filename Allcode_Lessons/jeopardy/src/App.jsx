import { useState } from 'react';
<<<<<<< Updated upstream
import flagPortugal from "./assets/Portugal.png";
import flagRumania from "./assets/Rumanien.png";
import flagMexico from "./assets/Mexico.png";
import flagEgypt from "./assets/Egypt.png";
import flagEtiopien from "./assets/Etiopien.png";
import monaLisa from "./assets/monaLisa.png";
import earth from "./assets/earth.png";
import streams from "./assets/streams.png";
import norge from "./assets/norge.png";
import abba from "./assets/abba.png";


import bulle from "./assets/abba.png";
import barack from "./assets/abba.png";
import gustav from "./assets/abba.png";
import gotland from "./assets/abba.png";
import lejon from "./assets/abba.png";
import tiktok from "./assets/abba.png";
import position from "./assets/abba.png";
import michelin from "./assets/abba.png";
import fotboll from "./assets/abba.png";
import stressed from "./assets/abba.png";
import jesus from "./assets/jesus.png";


const data = [
  {
    category: "Geografi",
    questions: [
      { value: 100, question: "Vilket är världens näst största land?" },
      { value: 200, question: "Vilket är världen minsta land?" },
      { value: 500, question: "Vilket land var först med att lägga ananas på pizza?" },
      { value: 800, question: "Hur många länder finns det i världen?", image: earth },
      { value: 1000, question: "Vad heter Zimbabwe's huvudstad?" }
    ]
  },
  {
    category: "Kultur",
    questions: [
      { value: 100, question: "Vad hette TikTok förut?" },
      { value: 200, question: "Vad heter karaktären som säger 'tänk om man vill gå och lägga sig halv tio då?' i Torkel i knipa?" },
      { value: 500, question: "Pippi Långstrump har många mellannamn. Ett av dem är en kryddväxt?" },
      { value: 800, question: "Vem målade Mona Lisa?", image: monaLisa },
      { value: 1000, question: "Vilken är den mest streamade låten på spotify genom tiderna?", image: streams }
    ]
  },
  {
    category: "Historia",
    questions: [
      { value: 100, question: "Vilket år föddes Jesus?", image: jesus },
      { value: 200, question: "Vilket år startade andra världskriget?" },
      { value: 500, question: "Vilken stad var Sveriges huvudstad innan Stockholm?", image: norge },
      { value: 800, question: "Vilka länder slogs i Waterloo?", image: abba },
      { value: 1000, question: "Vem sa: 'No one is born hating another person because of the color of his skin, or his background, or his religion'?" }
    ]
  },
  {
    category: "Allmänbildning",
    questions: [
      { value: 100, question: "Vad kostar det att göra en Kanelbulle?", image: bulle },
      { value: 200, question: "Vad heter denna position?", image: position },
      { value: 500, question: "Vad heter Sveriges enda 3 sjärniga michellin restaurang?", image: michelin },
      { value: 800, question: "Vilket land vann fotbolls VM 2022?", image: fotboll },
      { value: 1000, question: "Hur många andetag tar en människa dagligen?", image: stressed }
    ]
  },
  {
    category: "Gissa året",
    questions: [
      { value: 100, question: "Vilket år åkte vi till gotland för första gången?", image: gotland },
      { value: 200, question: "Vilket år kom TikTok ut?", image: tiktok },
      { value: 500, question: "Vilket år kom filmen Lejon Kungen ut?", image: lejon },
      { value: 800, question: "Vilket år blev Barack Obama president?", image: barack },
      { value: 1000, question: "Vilket årtal kröntes Gustav Vasa?", image: gustav }
    ]
  },
  {
    category: "Flaggor",
    questions: [
      { value: 100, question: "Vilket lands flagga är detta?", image: flagPortugal },
      { value: 200, question: "Vilket lands flagga är detta?", image: flagRumania },
      { value: 500, question: "Vilket lands flagga är detta?", image: flagMexico },
      { value: 800, question: "Vilket lands flagga är detta?", image: flagEgypt },
      { value: 1000, question: "Vilket lands flagga är detta?", image: flagEtiopien }
=======
import sins from "./assets/sins.png";
import benjamin from "./assets/benjamin.png";
import shrek from "./assets/shrek.png";
import taylorSwift from "./assets/taylorSwift.png";
import trump from "./assets/trump.png";
import charlie from "./assets/charlie.jpg";
import yak from "./assets/yak.png";
import sicilien from "./assets/sicilien.png";
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
      { value: 600, question: "Vilken är den vanligaste födelsedagen i Sverige?", yak },
      { value: 800, question: "Hur många öar har Sverige?", sicilien },
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
>>>>>>> Stashed changes
    ]
  }
];


function App() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [correct, setCorrect] = useState({});

  const numRows = Math.max(...data.map(c => c.questions.length));

  return (
<<<<<<< Updated upstream
    <div className="bg-blue-900 min-h-screen flex items-center justify-center">
=======
    <div className="bg-blue-900 min-h-screen flex flex-col items-center justify-start py-8 gap-4">
      {/* SCOREBOARD */}
      <div className="w-11/12 max-w-6xl grid grid-cols-2 md:grid-cols-5 gap-2">
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
>>>>>>> Stashed changes
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
            const isCorrect = !!correct[key];
            return (
              <div
                key={key}
                className={`relative text-center p-6 cursor-pointer font-bold
                  ${isCorrect
                    ? "bg-green-700 text-white opacity-70 line-through"
                    : "bg-blue-700 text-yellow-400 hover:bg-blue-600"
                  } text-2xl md:text-3xl`}
                onClick={() => q && setSelectedQuestion({ ...q, key })}
              >
                {q ? `${q.value}` : ""}
                
              </div>
            );
          })
        )}
      </div>

      {selectedQuestion && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-900 bg-opacity-70 ">
          <div className="bg-white rounded-xl p-6 max-w-md text-center">
            <h2 className="text-xl font-bold mb-4">{selectedQuestion.question}</h2>
            {selectedQuestion.image && (
              <img
                src={selectedQuestion.image}
                alt="Frågebild"
                className="mx-auto mb-4 max-h-64 object-contain"
              />
            )}

            <button
              onClick={() => setSelectedQuestion(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-300"
            >
              Close
            </button>

            <button
              onClick={() =>
                setCorrect((prev) => ({
                  ...prev,
                  [selectedQuestion.key]: !prev[selectedQuestion.key],
                }))
              }
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
            >
              {correct[selectedQuestion.key] ? "Avmarkera" : "Markera"}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
