import { createContext } from "react";


export const ContextNav = createContext();

export const ContextNavProvider = ({ children }) => {

    return (
        <ContextNav.Provider value={{}}>
            {children}
        </ContextNav.Provider>
    )
}