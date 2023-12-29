import React, { useEffect, useState } from 'react'
import getData from '../../Hooks/getData';
import NotFoundView from '../../View/NotFound/NotFoundView';

async function fetchURLPowerBI(id) {
    try {
        const URL = `${API_SGI360}/admin/getPowerBi.php?idProcess=${id}`;
        const data = await getData(URL);
        return data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
}

function DashboardGralView() {

    const [urlPowerBI, setUrlPowerBI] = useState(sessionStorage.getItem('power_bi'))
    let powerBI = true;
    if (urlPowerBI == 'null') {
        powerBI = false;
    }
    return (
        <>
            <div className="mx-1 mb-5">
                <div className="h-full w-full">
                    {
                        powerBI ?
                            <iframe title="Report Section" className='w-full h-screen' src={urlPowerBI} allowFullScreen={true}></iframe>
                            :
                            <NotFoundView />
                    }
                </div>
            </div >
        </>
    )
}

export default DashboardGralView