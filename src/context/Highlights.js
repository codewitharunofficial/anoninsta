"use client";
const { createContext, useState, useContext } = require("react");

const Highlight = createContext();

export const HighlightsProvider = ({children}) => {
    const [media, setMedia] = useState([]);

    return (
        <Highlight.Provider value={{media, setMedia}} >
           {children}
        </Highlight.Provider>
    );
}

export const useHighlight = () => useContext(Highlight);