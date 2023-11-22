import React, { useEffect, useState } from 'react'
import getData from '../../Hooks/getData';
import NotFoundView from '../../View/NotFound/NotFoundView';
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

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

    const [urlPowerBI, setUrlPowerBI] = useState("")

    const fetchDataURL = async () => {
        try {
            const idProcess = sessionStorage.getItem('id_process_fk');
            const data = await fetchURLPowerBI(idProcess);
            return data;
        } catch (error) {
            console.error("Error al obtener los datos del objetivo:", error);
            return [];
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const URL = await fetchDataURL();
                setUrlPowerBI(URL[0].url);
            } catch (error) {
                console.error("Error al obtener los datos del objetivo:", error);
            }
        };
        fetchData();
    }, []);



    return (
        <>
            <div className="mx-1 mb-5">
                <div className="h-full w-full">
                    {
                        urlPowerBI ?
                        <iframe title="Report Section" className='w-full h-screen' src="https://app.powerbi.com/view?r=eyJrIjoiMTA3YzRjYjQtNWIzNS00ODI5LWIzYzMtYmViZWNjMWVjMzA2IiwidCI6ImZhZDc1YTU0LWEzMjMtNGNkMC04ZTUxLTZhOGQ1NzAzNWFhOCIsImMiOjh9" allowFullScreen={true}></iframe>
                            :
                            <NotFoundView/>
                    }
                </div>
            </div >
        </>
    )
}

export default DashboardGralView