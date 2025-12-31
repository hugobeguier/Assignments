import { useState } from 'react';
import sins from "./assets/sins.png";
import benjamin from "./assets/benjamin.png";
import shrek from "./assets/shrek.png";
import taylorSwift from "./assets/taylorSwift.png";
import trump from "./assets/trump.png";
import charlie from "./assets/charlie.jpg";
import yak from "./assets/yak.png";
import sicilien from "./assets/sicilien.png";

// import monaLisa from "./assets/monaLisa.png";
// import earth from "./assets/earth.png";
// import streams from "./assets/streams.png";
// import norge from "./assets/norge.png";
// import abba from "./assets/abba.png";


// import bulle from "./assets/abba.png";
// import barack from "./assets/abba.png";
// import gustav from "./assets/abba.png";
// import gotland from "./assets/abba.png";
// import lejon from "./assets/abba.png";
// import tiktok from "./assets/abba.png";
// import position from "./assets/abba.png";
// import michelin from "./assets/abba.png";
// import fotboll from "./assets/abba.png";
// import stressed from "./assets/abba.png";
// import jesus from "./assets/jesus.png";


const data = [
  {
    category: "2025",
    questions: [
      { value: 100, question: "Begreppet ”6–7” vilken gest gör man?" },
      { value: 200, question: "I år fick vi en ny påve vilket land är han ifrån?" },
      { value: 400, question: "Vilket land vann Eurovision?" },
      { value: 600, question: "Vad heter den amerikanska högerdebattören som sköts ihjäl i höstas?" },
      { value: 800, question: "Vilken var den mest sedda biofilmen i Sverige 2025?"},
      { value: 1000, question: "I somras var det fotbolls-EM för damer. Hur långt gick Sverige i turneringen?" }
    ]
  },
  {
    category: "Vem är detta?",
    questions: [
      { value: 100, question: "", image: shrek },
      { value: 200, question: "", image: charlie },
      { value: 400, question: "", image: sins },
      { value: 600, question: "", image: trump },
      { value: 800, question: "" , image: benjamin},
      { value: 1000, question: "", image:  taylorSwift}
    ]
  },
  {
    category: "Historia & Kultur",
    questions: [
      { value: 100, question: "Vad hette USA's första president?" },
      { value: 200, question: "Vilket år föll Berlinmuren?" },
      { value: 400, question: "Vilken svensk sagofigur hade 80-års jubelium i år?" },
      { value: 600, question: "Vilken stad brukar kallas för 'Sverige första stad'?" },
      { value: 800, question: "Vilket land har Cricket som deras nationalsport?" },
      { value: 1000, question: "Vad hette perioden då meteoren kom och utrotade alla dinosaurer?" }
    ]
  },
  {
    category: "Allmänt",
    questions: [
      { value: 100, question: "Är en kilometer längre eller kortare än en engelsk mile?" },
      { value: 200, question: "Vad används för att smaksätta gin?" },
      { value: 400, question: "Vilken vetenskapsman har vunnit Nobelpriset två gånger?" },
      { value: 600, question: "Vad är skillnaden mellan en Oxe och en Tjur?" }, 
      { value: 800, question: "I vilket land uppfanns kaffe?" },
      { value: 1000, question: "Vilket djur har tre vaginor?" }
    ]
  },
  {
    category: "Geografi",
    questions: [
      { value: 100, question: "Genom vilka länder sträcker sig Alperna?" },
      { value: 200, question: "Hur många huvudstäder har Sydafrika?" },
      { value: 400, question: "I vilket hav ligger Marianagraven?"},
      { value: 600, question: "I vilken världsdel hittar man detta djuret?",  yak},
      { value: 800, question: "Vilken ö's flagga är detta?", sicilien },
      { value: 1000, question: "La pas är huvudstad i vilket land?" }
    ]
  },
  {
    category: "Film citat",
    questions: [
      { value: 100, question: "Here's Johnny!" },
      { value: 200, question: "Draw me like one of your french girls" },
      { value: 400, question: "Luke, I am your father" },
      { value: 600, question: "Royal with cheese" },
      { value: 800, question: "You're gonna need a bigger boat" },
      { value: 1000, question: "You're a fake and a phony!" }
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
