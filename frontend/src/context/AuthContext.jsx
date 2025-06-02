import { createContext, useContext, useState } from "react";

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
    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider value={ {user, setUser} }>
            {children}
        </AuthContext.Provider>
    )
}