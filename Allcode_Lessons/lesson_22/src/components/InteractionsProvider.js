import React, { useCallback, useState } from "react";
import InteractionsContext from "../contexts/InteractionsContext";

function InteractionsProvider({ children }) {
    const [counters, setCounters] = useState({});

    const incrementCounter = useCallback((userId) => {
        
        setCounters((prevCounters) => ({
            ...prevCounters,
            [userId]: (prevCounters[userId] || 0) + 1,
        }));
    }, []);

    return (
        <InteractionsContext.Provider value={{ counters, incrementCounter }}>
            {children}
        </InteractionsContext.Provider>
    );
}

export default InteractionsProvider;