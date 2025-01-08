import { useState } from "react";

function Counter () {

    const [count, setCount] = useState(0);

    return (
        <div>
            <h3>Current Count: {count}</h3>
            <button onClick={() => setCount(count + 1)} className="ButtonStyling">
               Increment
            </button>
            <button onClick={() => setCount(count - 1)} className="ButtonStyling">
                Decrement 
            </button>
        </div>
    );
}

export default Counter;