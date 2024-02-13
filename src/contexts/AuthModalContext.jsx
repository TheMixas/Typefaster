import {createContext, useState} from "react";


export const AuthModalContext = createContext()
export const AuthModalContextProvider = ({children}) => {

    //TODO:default value should be isAuthenticated()
    const [authPopup, setAuthPopup] = useState(false);
    const toggleAuthPopup = ()=>{
        setAuthPopup(!authPopup)

    }

    return(
        <AuthModalContext.Provider value={{authPopup,setAuthPopup,toggleAuthPopup}}>
            {children}
        </AuthModalContext.Provider>
    )
}