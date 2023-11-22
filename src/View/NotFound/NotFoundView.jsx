import React from 'react'

import Tools from '../../assets/tools.png'


function NotFoundView() {
    return (
        <>
            <main className="grid p-12 place-items-center bg-white">
                <div className="text-center">
                    <div className='flex justify-center items-center m-5'>
                        <img src={Tools} alt="Error 404" srcSet={Tools} className='w-1/3'/>
                    </div>
                    <p className="text-4xl font-semibold text-slate-700">404</p>
                    <h1 className="p-3 mt-4 text-3xl font-bold tracking-tight text-slate-800 sm:text-5xl">Página no encontrada</h1>
                    
                </div>
            </main>
        </>
    )
}

export default NotFoundView