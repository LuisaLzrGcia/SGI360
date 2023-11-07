import React, { useState } from 'react'
import Logo from '../../assets/logo.png';
import Alert from '../../Component/Alert/Alert';

function LoginView({ handledLoginSubmit, found, setFound }) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    return (

        <>
            <div className='flex justify-center items-center w-screen h-full'>
                <div className='grid grid-cols-2 gap-4 divide-x divide-gray-300 shadow-2xl rounded-xl p-3'>
                    <div className='flex justify-center items-center'>
                        <img className='w-auto h-auto' alt="" srcSet={Logo} />
                    </div>
                    <div className="flex p-5 w-auto justify-center flex-col items-center">
                        <h1 className="text-5xl p-3">Bienvenido</h1>
                        <div className="p-3">
                            <form className="flex flex-col gap-3" onSubmit={handledLoginSubmit}>
                                <div className='w-[300px] p-2 rounded-md shadow-md bg-white flex content-center border'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9CA3AF" className="w-7 h-7 pr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                    <input
                                        onChangeCapture={() => setFound(false)}
                                        name="username"
                                        placeholder="Usuario"
                                        className='bg-white'
                                    />

                                </div>
                                <div className="relative">
                                    <div className='w-[300px] p-2 rounded-md shadow-md bg-white flex content-center border'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9CA3AF" className="w-7 h-7 pr-1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>

                                        <input
                                            onChangeCapture={() => setFound(false)}
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Contraseña"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 text-gray-500"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {
                                    found ? (
                                        <Alert type={"Error"} message={"Usuario o contraseña incorrectos"} />
                                    ) : (
                                        null
                                    )
                                }
                                <button type="submit" className="bg-gray-800 hover:bg-gray-700 text-gray-50 rounded-lg py-2">
                                    Ingresar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginView