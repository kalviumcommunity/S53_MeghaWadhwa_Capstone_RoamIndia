import { User, useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { createContext, useLayoutEffect, useRef, useState} from 'react'

interface AppContextType {
    aboutRef: React.MutableRefObject<HTMLDivElement>;
    loginDone: boolean;
    loginSuccessfull: boolean;
    askUser: string;
    loggedInUser: Object;
    setAskUser: (askUser: string) => void;
    setLoginSuccessfull: (loginSuccessfull: boolean) => void;
    setLoginDone: (loginDone: boolean) => void;
    setLoggedInUser: (loggedInUser: Object) => void;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface ParentContextProps {
    children: React.ReactNode; // Define the type of the children prop
}

const ParentContext: React.FC<ParentContextProps> = ({ children }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const aboutRef = useRef<HTMLDivElement>(document.createElement('div'))
    const [loginDone,setLoginDone] = useState<boolean>(true)
    const [loginSuccessfull,setLoginSuccessfull] = useState<boolean>(false)
    const [askUser,setAskUser] = useState<string>("")
    const [loggedInUser,setLoggedInUser] = useState<Object>("")
    
    
    
    useLayoutEffect(()=>{
        if(isAuthenticated){
            setLoginDone(false);
            const checkUser = async (user : User|undefined) =>{
                const res = await axios.post("http://localhost:5001/api/users/checkbyemail",user)
                
                return res.data
            }
            checkUser(user).then((res)=>{
                console.log(res);
                
                if(!res.found){
                    if(res.isSocial){
                        setAskUser("Username")
                    }else{
                        setAskUser("Name")
                    }
                }else{
                    setLoggedInUser(res.OneUser)
                    setLoginSuccessfull(true)
                    setLoginDone(true)
                }
                
            }).catch(err=>{
                setLoginSuccessfull(false)
                setLoginDone(true)
                console.log(err);
                
            })
        }
    },[isAuthenticated])

    useLayoutEffect(()=>{
        if(loginSuccessfull){
            setAskUser("")
        }
    },[loginSuccessfull])
    useLayoutEffect(()=>{
        if(isLoading){
            setLoginDone(false)
        }else if(!isLoading && !isAuthenticated){
            setLoginDone(true)
            setLoginSuccessfull(false)
        }
    },[isLoading])
    

    return (
        <AppContext.Provider value={{ aboutRef,loginDone,loginSuccessfull,askUser,loggedInUser,setAskUser,setLoginDone,setLoginSuccessfull,setLoggedInUser }}>
            {children}
        </AppContext.Provider>
    )
}

export default ParentContext