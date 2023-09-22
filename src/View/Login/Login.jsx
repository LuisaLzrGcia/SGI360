import React, { useContext, useEffect, useState } from 'react'
import LoginView from './LoginView'
import FooterView from '../../Layout/Footer/FooterView'
import jwtDecode from 'jwt-decode'
import useSWR from '../../Hooks/getData'
import useAuth from '../../Hooks/useAuth'
import { SGIContext } from '../../Context/SGIContext'
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

function Login() {
    const {isAuth, getAuth,} = useAuth();

    const [found, setFound] = useState(false)

    const handledLoginSubmit = async (e) => {
        e.preventDefault()
        console.log("handledLoginSubmit")
        const form = new FormData(e.target)
        const formData = Object.fromEntries(form)
        const { username, password } = formData;
        const data = await loginUser(username, password);
        if (data != null) {
            getAuth(data)
            window.location="/admin"
        } else {
            setFound(true)
        }
    }

    async function loginUser(usernameForm, passwordForm) {
        try {
            const response = await fetch(`${API_SGI360}/login.php?user_name="${usernameForm}"&password="${passwordForm}"`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameForm,
                    password: passwordForm
                })
            });

            if (!response.ok) {
                throw new Error('Error en la petición');
            }

            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error:', error.message);
            return null;
        }
    }

    return (
        <>
            <LoginView handledLoginSubmit={handledLoginSubmit} found={found} setFound={setFound} />
        </>
    )
}

export default Login;