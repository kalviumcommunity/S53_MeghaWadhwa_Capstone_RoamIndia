import { User, useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { createContext, useLayoutEffect, useRef, useState } from 'react'
import { setCookie } from "./../ManageCookies";

interface AppContextType {
    aboutRef: React.MutableRefObject<HTMLDivElement>;
    loginDone: boolean;
    loginSuccessful: boolean;
    askUser: string;
    loggedInUser: Object;
    setAskUser: (askUser: string) => void;
    setLoginSuccessful: (loginSuccessful: boolean) => void;
    setLoginDone: (loginDone: boolean) => void;
    setLoggedInUser: (loggedInUser: Object) => void;
    data: StateData[],
    setData: (data: StateData[]) => void;
    cityData: CityData[],
    setCityData: (citydata: CityData[]) => void;
    attractionData: AttractionData[],
    setAttractionData: (data: AttractionData[]) => void;
    selected: string,
    setSelected: (selected: string) => void;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface ParentContextProps {
    children: React.ReactNode; // Define the type of the children prop
}

interface StateData {
    _id: string,
    State_Name: string,
    State_Code: string,
    Popular_Attractions: Array<string>,
    Image: URL,
    State_Description: string
}

interface CityData {
    _id: string,
    City_Name: string,
    State: string,
    Latitude: string,
    Longitude: string,
    Image?: URL,
    City_Description: string
    Popular_Attractions: Array<string>,
}

interface AttractionData {
    _id: string,
    Attraction_Name: string,
    State: string,
    City: string
    Popular_Attractions: Array<string>,
    Image: URL,
    Attraction_Description: string,
    Location: string,
    Attraction_Type: string,
    Things_To_Know: Array<string>,
    How_To_Get_There: string
}

const ParentContext: React.FC<ParentContextProps> = ({ children }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const aboutRef = useRef<HTMLDivElement>(document.createElement('div'))
    const [loginDone, setLoginDone] = useState<boolean>(true)
    const [loginSuccessful, setLoginSuccessful] = useState<boolean>(false)
    const [askUser, setAskUser] = useState<string>("")
    const [loggedInUser, setLoggedInUser] = useState<Object>("")
    const [data, setData] = useState<StateData[]>([])
    const [cityData, setCityData] = useState<CityData[]>([])
    const [attractionData, setAttractionData] = useState<AttractionData[]>([])
    const [selected, setSelected] = useState<string>("")


    useLayoutEffect(() => {
        if (isAuthenticated) {
            setLoginDone(false);
            const checkUser = async (user: User | undefined) => {
                if (!user) {
                    return
                }
                const res = await axios.post(import.meta.env.VITE_CHECKBYMAIL, user)
                return res.data
            }
            checkUser(user).then((res) => {
                if (!res.found) {
                    if (res.isSocial) {
                        setAskUser("Username")
                    } else {
                        setAskUser("Name")
                    }
                } else {
                    setLoggedInUser(res.OneUser)
                    setCookie("username", res.access_token, 2);
                    setLoginSuccessful(true)
                    setLoginDone(true)
                }

            }).catch(err => {
                setLoginSuccessful(false)
                setLoginDone(true)
                console.log(err);

            })
        }
    }, [isAuthenticated])

    useLayoutEffect(() => {
        if (loginSuccessful) {
            setAskUser("")
        }
    }, [loginSuccessful])

    useLayoutEffect(() => {
        if (isLoading) {
            setLoginDone(false)
        } else if (!isLoading && !isAuthenticated) {
            setLoginDone(true)
            setLoginSuccessful(false)
        }
    }, [isLoading])

    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://s53-meghawadhwa-capstone-roamindia.onrender.com/api/states`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://s53-meghawadhwa-capstone-roamindia.onrender.com/api/cities`);
                setCityData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://s53-meghawadhwa-capstone-roamindia.onrender.com/api/attractions`);
                setAttractionData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = async(e: React.ChangeEvent<HTMLSelectElement>) => {
        if (setSelected) {
          setSelected(e.target.value);
          console.log("Selected", selected)
        } else {
          console.error('setSelected is not defined in the context.');
        }
      }


    return (
        <AppContext.Provider value={{ aboutRef, loginDone, loginSuccessful, askUser, loggedInUser, setAskUser, setLoginDone, setLoginSuccessful, setLoggedInUser, data, setData, selected, setSelected, cityData, setCityData, attractionData, setAttractionData, handleChange }}>
            {children}
        </AppContext.Provider>
    )
}

export default ParentContext

