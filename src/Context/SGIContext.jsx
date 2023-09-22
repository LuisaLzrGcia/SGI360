import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import getData from '../Hooks/getData';

const API_SGI360 = import.meta.env.VITE_API_DATABASE;

export const SGIContext = createContext();

export function SGIContextProvider(props) {

    const deleteDataUser = async (id) => {
        const deleteUser = await getData(
            `${API_SGI360}/admin/deleteUser.php?idUser=${encodeURIComponent(id)}`
        );
        return deleteUser;

    };
    const insertDataUser = async (usernameInput, passwordInput, firstNameInput, lastNameInput, typeUserInput) => {
        return await getData(
            `${API_SGI360}/admin/insertUser.php?newUsername=${encodeURIComponent(usernameInput)}&newPassword=${encodeURIComponent(passwordInput)}&newFirstName=${encodeURIComponent(firstNameInput)}&newLastName=${encodeURIComponent(lastNameInput)}&newTypeUser=${typeUserInput == 'admin' ? 1 : 2}`
        );

    };
    const [selectedComponent, setSelectedComponent] = useState('dashboard');

    return (
        <SGIContext.Provider
            value={{
                deleteDataUser,
                insertDataUser,
                selectedComponent,
                setSelectedComponent
            }}>
            {props.children}
        </SGIContext.Provider>
    );
}