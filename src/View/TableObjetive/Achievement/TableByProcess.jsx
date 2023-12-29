import React, { useEffect, useRef, useState } from 'react';
import { fetchDataProcess } from '../../../utils/fetchDataProcess';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import dataAPI from '../../../Hooks/getDataAPI';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;


import TableAchievementByProcess from './TableAchievementByProcess';
import TableCurrentByProcess from './TableCurrentByProcess';


const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const arrayYears = Array.from({ length: 27 }, (_, index) => (2023 + index).toString());

const getProcess = async () => {
    try {
        const processData = await fetchDataProcess();
        return processData;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error; // Asegúrate de lanzar el error después de manejarlo
    }
}

async function fetchData(process, year) {
    try {
        const URL = `${API_SGI360_NODEJS}/views/${encodeURIComponent(process)}/${year}`;
        const data = await dataAPI(URL);
        return data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
}

async function fetchDataObjectiveCurrent(process, year) {
    try {
        const URL = `${API_SGI360_NODEJS}/views/current/${encodeURIComponent(process)}/${year}`;
        const data = await dataAPI(URL);
        return data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
}

async function fetchResponsible(process) {
    try {
        const URL = `${API_SGI360_NODEJS}/user_process/${encodeURIComponent(process)}`;
        console.log(URL)
        const data = await dataAPI(URL);
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
}

function TableByProcess() {
    const [dataTableAchievement, setDataTableAchievement] = useState([])
    const [dataTableCurrent, setDataTableCurrent] = useState([])
    const [dataProcess, setDataProcess] = useState([]);
    const nameProcess = dataProcess.map(item => item.name);
    const [nameProcessInput, setNameProcessInput] = useState("")
    const currentDate = new Date();
    const currentYearFind = currentDate.getFullYear();
    const [currentYear, setCurrentYear] = useState(currentYearFind.toString());
    const [responsible, setResponsible] = useState([])

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const data = await getProcess();
                setDataProcess(data);
            } catch (error) {
                alert("Error al obtener los datos:", error);
            }
        }

        fetchDataFromAPI();
    }, [])

    useEffect(() => {
        const fetchDataAchievement = async () => {
            try {
                const dataAchievement = await fetchData(nameProcessInput, currentYear);
                const dataCurrent = await fetchDataObjectiveCurrent(nameProcessInput, currentYear);
                const responsibleData = await fetchResponsible(nameProcessInput);
                if (dataAchievement.length === 0) {
                    setDataTableAchievement([])
                } else {
                    setDataTableAchievement(dataAchievement)
                    setDataTableCurrent(dataCurrent)
                    setResponsible(responsibleData)
                }
            } catch (error) {
                alert("Error al obtener los datos:", error);
            }
        }
        if (nameProcessInput.trim() !== '') {
            fetchDataAchievement();
        }
    }, [nameProcessInput, currentYear])

    return (
        <>
            <div className="flex items-center justify-between">
                <div className='flex w-full'>
                    <div className='m-2 -ml-2'>
                        <span className='text-sm font-semibold' >Proceso</span>
                        <SearchSelectView
                            placeholder="Seleccione un proceso"
                            select={nameProcessInput}
                            setSelectValue={setNameProcessInput}
                            valores={nameProcess}
                        />
                    </div>
                    <div className='m-2'>
                        <span className='text-sm font-semibold' >Año</span>
                        <SearchSelectView
                            placeholder="Seleccione un año"
                            select={currentYear}
                            setSelectValue={setCurrentYear}
                            valores={arrayYears}
                        />
                    </div>
                    <div className='m-2 flex justify-end items-end w-full'>

                    </div>
                </div>
            </div>
            <TabGroup>
                <TabList className="">
                    <Tab >Cumplimiento</Tab>
                    <Tab >Actual</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <TableAchievementByProcess
                            dataTable={dataTableAchievement}
                            nameProcess={nameProcessInput} />
                    </TabPanel>
                    <TabPanel>
                        <TableCurrentByProcess
                            dataTable={dataTableCurrent}
                            nameProcess={nameProcessInput}
                            responsible={responsible} />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </>
    )
}

export default TableByProcess;
