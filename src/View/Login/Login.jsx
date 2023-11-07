import React, { useContext, useEffect, useState } from 'react'
import LoginView from './LoginView'
import FooterView from '../../Layout/Footer/FooterView'

import useAuth from '../../Hooks/useAuth'
import { SGIContext } from '../../Context/SGIContext'
import getData from '../../Hooks/getData'
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

function Login() {
    const { isAuth, getAuth, } = useAuth();

    const [found, setFound] = useState(false)

    const handledLoginSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const formData = Object.fromEntries(form)
        const { username, password } = formData;
        const data = await loginUser(username, password);
        if (data.id_user_pk>0) {
            getAuth(data)
            if(sessionStorage.getItem("type")=="Admin"){
                window.location = "/admin"
            }else{
                window.location = "/manager"
            } 
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