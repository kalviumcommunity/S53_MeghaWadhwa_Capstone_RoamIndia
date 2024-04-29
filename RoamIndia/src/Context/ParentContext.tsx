import React, { createContext, useRef} from 'react'

interface AppContextType {
    aboutRef: React.MutableRefObject<HTMLDivElement>;
}
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface ParentContextProps {
    children: React.ReactNode; // Define the type of the children prop
}

const ParentContext: React.FC<ParentContextProps> = ({ children }) => {
    const aboutRef = useRef<HTMLDivElement>(document.createElement('div'))

    return (
        <AppContext.Provider value={{ aboutRef }}>
            {children}
        </AppContext.Provider>
    )
}

export default ParentContext