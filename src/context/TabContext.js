"use client";
const { createContext, useState, useContext } = require("react");

const Tabs = createContext();

export const TabsProvider = ({children}) => {
    const [activeTab, setActiveTab] = useState("Stories");

    return (
        <Tabs.Provider value={{activeTab, setActiveTab}} >
           {children}
        </Tabs.Provider>
    );
}

export const useTabs = () => useContext(Tabs);