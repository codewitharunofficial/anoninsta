"use client";
const { createContext, useState, useContext } = require("react");

const Highlight = createContext();

export const HighlightsProvider = ({ children }) => {
    const [media, setMedia] = useState([]);
    const [isMediaLoading, setIsMediaLoading] = useState(false);

    return (
        <Highlight.Provider value={{ media, setMedia, isMediaLoading, setIsMediaLoading }} >
            {children}
        </Highlight.Provider>
    );
}

export const useHighlight = () => useContext(Highlight);