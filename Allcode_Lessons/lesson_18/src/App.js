import './App.css';
import Greeting from "./components/Greeting.js";
import Counter from "./components/Counter.js"
import FeedbackForm from './components/FeedbackForm.js';

function App() {
  return (
  <>
    <div className="header">
      <Greeting name={"Hugo"} />
    </div>
    <div className="counter">
      <Counter/>
    </div>
    <div className="feedback-form">
      <FeedbackForm options={["Good","Average","Poor"]}/>
    </div>
  </>
  );
}

export default App;
