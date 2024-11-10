"use client";
const { createContext, useState, useContext } = require("react");

const User = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        user: {},
        user_name: "",
        full_name: "",
        stories: [],
        posts: [],
        highlights: [],
        comments: []
    });

    return (
        <User.Provider value={{user, setUser}} >
           {children}
        </User.Provider>
    );
}

export const useUser = () => useContext(User);