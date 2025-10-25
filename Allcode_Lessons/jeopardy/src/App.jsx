import { useState } from 'react';
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
    ]
  }
];


function App() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [correct, setCorrect] = useState({});

  const numRows = Math.max(...data.map(c => c.questions.length));

  return (
    <div className="bg-blue-900 min-h-screen flex items-center justify-center">
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
