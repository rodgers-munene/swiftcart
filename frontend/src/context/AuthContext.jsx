import { createContext, useContext, useState, useEffect } from "react";

// create the context 
const AuthContext = createContext()

// create a custom hook for the  AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be used inside the AuthProvider')
    }

    return context;
}

// create the provide to wrap  the app with
export const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState(localStorage.getItem('user'))
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(()=>{
        const checkToken = () => {
            const expiry = localStorage.getItem('expiresAt')
            if(expiry && Date.now() > expiry){
                logout();
            }
        }

        checkToken(); //runs once on mount

        // check every 10 minutes to ensure the
        const interval = setInterval(checkToken, 600000)

        return () => clearInterval(interval)

    }, [])

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={ {user, setUser, token, logout} }>
            {children}
        </AuthContext.Provider>
    )
}