import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'

export const SGIContext = createContext();

export function SGIContextProvider(props) {
    const [selectedComponent, setSelectedComponent] = useState('dashboard');

    return (
        <SGIContext.Provider
            value={{
                setSelectedComponent,
                selectedComponent
            }}>
            {props.children}
        </SGIContext.Provider>
    );
}