import React, { useState } from 'react'
import LoginView from './LoginView'
import useAuth from '../../Hooks/useAuth'
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

function Login() {
    const { isAuth, getAuth, } = useAuth();

    const [found, setFound] = useState(false)

    const handledLoginSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const formData = Object.fromEntries(form)
        const { username, password } = formData;
        const data = await loginUser(username, password);
        if (data != null) {
            setFound(false)
            getAuth(data)
            if (sessionStorage.getItem("type") == "Admin") {
                window.location = "/admin"
            } else {
                window.location = "/manager"
            }
        } else {
            setFound(true)
        }
    }

    async function loginUser(usernameForm, passwordForm) {
        const URL = `${API_SGI360_NODEJS}/login`;
        try {
            const response = await fetch(URL, {
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
            console.log(json)
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