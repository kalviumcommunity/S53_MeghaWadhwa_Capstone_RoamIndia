import { User, useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { EffectCallback, createContext, useEffect, useRef} from 'react'

interface AppContextType {
    aboutRef: React.MutableRefObject<HTMLDivElement>;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface ParentContextProps {
    children: React.ReactNode; // Define the type of the children prop
}

const ParentContext: React.FC<ParentContextProps> = ({ children }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const aboutRef = useRef<HTMLDivElement>(document.createElement('div'))
    useEffect(()=>{
        const checkUser = async (user : User|undefined) =>{
            const res = await axios.post("http://localhost:5001/api/users/checkbyemail",user)
            const isSocial = user?.sub?.split("|")[0] === "auth0" ? false:true
            return {
                found: res.data.found,
                isSocial
            } 
        }
        if(isAuthenticated){
            checkUser(user).then((res)=>{
                if(res.found)
                
            }).catch()
        }
    },[isAuthenticated])
    
    

    return (
        <AppContext.Provider value={{ aboutRef }}>
            {children}
        </AppContext.Provider>
    )
}

export default ParentContext