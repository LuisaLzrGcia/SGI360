import React, { useEffect, useState } from 'react';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import { Table } from '@tremor/react';
import postAPI from "../../../Hooks/postAPI";
import fetchDataPerspective from "../../../utils/fetchDataPerspective";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;


function NewObjetiveList({ closeModal, arrayProcess, arrayYears, handleRefresh = () => { } }) {
    const [dataProcess, setDataProcess] = useState(arrayProcess);
    const nameProcess = arrayProcess.map(item => item.name);
    const [nameProcessInput, setNameProcessInput] = useState("Gerencia")
    const currentDate = new Date();
    const currentYearFind = currentDate.getFullYear();
    const [currentYear, setCurrentYear] = useState(currentYearFind.toString());
    const [perspectiveData, setPerspectiveData] = useState([]);

    const [tableData, setTableData] = useState([]);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Guardar objetivos");


    const handleAddRow = () => {
        const newRow = {
            year: parseInt(currentYear),
            perspective: '',
            application: '',
            objective: '',
            measurement: '',
            consult: '',
            initialValue: '',
            finalValue: '',
            date: '',
            frequency: 'Mensual',
            who: '',
            communicate: '',
            expected: ''
        };
        setTableData((prevData) => [...prevData, newRow]);

    };

    const handleDeleteRow = (index) => {
        setTableData((prevData) => prevData.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, field, value) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData[index][field] = value;
            return newData;
        });
    };

    const saveData = async () => {
        setIsLoading(true);
        setLoadingMessage("Guardando...");

        const processFind = arrayProcess.find((item) => item.name === nameProcessInput);

        const data = tableData.map((row) => ({
            perspective: row.perspective,
            application: row.application.trim(),
            objective: row.objective.trim(),
            measurement: row.measurement.trim(),
            consult: row.consult.trim(),
            initialValue: row.initialValue.trim(),
            finalValue: row.finalValue.trim(),
            date: row.date.trim(),
            frequency: row.frequency.trim(),
            who: row.who.trim(),
            communicate: row.communicate.trim(),
            expected: row.expected.trim(),
            year: parseInt(currentYear),
            idProcess: parseInt(processFind.id_process_pk),
        }));

        const URL = `${API_SGI360_NODEJS}/objective`;
        postAPI(URL, data, closeModal, handleRefresh)
    }

    const getPerspective = async () => {
        try {
            const data = await fetchDataPerspective()
            setPerspectiveData(data)
        } catch (err) {
            console.log("Error ", err)
        }
    }


    const isAnyInputEmpty = () => {
        return tableData.some((row) => Object.values(row).some(value => value === ''));
    };

    useEffect(() => {
        handleAddRow();
        handleAddRow();
    }, [arrayProcess]);

    useEffect(() => {
        setIsSaveDisabled(isAnyInputEmpty());
        getPerspective()
    }, [tableData]);


    return (
        <>
            <div className="pb-5 flex items-center justify-start">
                <div className='m-2'>
                    <div className='text-sm'>Proceso</div>
                    <SearchSelectView
                        placeholder="Seleccione un proceso"
                        select={nameProcessInput}
                        setSelectValue={setNameProcessInput}
                        valores={nameProcess}
                    />
                </div>
                <div className='m-2'>
                    <div className='text-sm'>Año</div>
                    <SearchSelectView
                        placeholder="Seleccione un año"
                        select={currentYear}
                        setSelectValue={setCurrentYear}
                        valores={arrayYears}
                    />
                </div>
                <div className='m-2 flex items-center w-full justify-end'>
                    <div className='w-full flex justify-end items-center'>
                        <div className='flex justify-center items-center'>
                            <button
                                onClick={handleAddRow}
                                className={`rounded-md p-2 m-1 mr-5 text-white text-sm mt-1 bg-slate-700`}
                            >
                                Agregar Fila
                            </button>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button
                                disabled={isSaveDisabled}
                                onClick={saveData}
                                className={`rounded-md p-2 m-1 text-white text-sm mt-1 ${isSaveDisabled ? 'bg-slate-500' : 'bg-slate-700'
                                    }`}
                            >
                                {loadingMessage}
                            </button>
                        </div>

                    </div>
                </div>

            </div >
            <div className={`overscroll-contain`}>
                <Table className='snap-center'>
                    <thead className="text-black">
                        <tr>
                            <th><div className="flex item-center justify-center text-center">Perspectiva</div></th>
                            <th><div className="flex item-center justify-center text-center">Aplicación</div></th>
                            <th><div className="flex item-center justify-center text-center">Objetivo</div></th>
                            <th><div className="flex item-center justify-center text-center">Unidad de medida</div></th>
                            <th><div className="flex item-center justify-center text-center">Consulta</div></th>
                            <th><div className="flex item-center justify-center text-center">Valor inicial</div></th>
                            <th><div className="flex item-center justify-center text-center">Valor esperado</div></th>
                            <th><div className="flex item-center justify-center text-center">Fecha</div></th>
                            <th><div className="flex item-center justify-center text-center">Frecuencia</div></th>
                            <th><div className="flex item-center justify-center text-center">Quién</div></th>
                            <th><div className="flex item-center justify-center text-center">Comunicar</div></th>
                            <th><div className="flex item-center justify-center text-center">EsperadoXMes</div></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={`text-md text-black`}>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td className='p-1'>
                                    <SearchSelectView
                                        placeholder="Seleccione una perspectiva"
                                        select={row.perspective}
                                        setSelectValue={(value) => handleInputChange(index, 'perspective', value)}
                                        valores={perspectiveData}
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
                                        maxLength={399}
                                        className="w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                                        type="text"
                                        value={row.application}
                                        onChange={(e) =>
                                            handleInputChange(index, 'application', e.target.value)
                                        }
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
                                        maxLength={390}
                                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                                        type="text"
                                        value={row.objective}
                                        onChange={(e) =>
                                            handleInputChange(index, 'objective', e.target.value)
                                        }
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
                                        maxLength={99}
                                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                                        type="text"
                                        value={row.measurement}
                                        onChange={(e) =>
                                            handleInputChange(index, 'measurement', e.target.value)
                                        }
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
                                        maxLength={99}
                                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                                        type="text"
                                        value={row.consult}
                                        onChange={(e) =>
                                            handleInputChange(index, 'consult', e.target.value)
                                        }
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
                                        maxLength={99}
                                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                                        type="text"
                                        value={row.initialValue}
                                        onChange={(e) =>
                                            handleInputChange(index, 'initialValue', e.target.value)
                                        }
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
                                        maxLength={99}
                                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                                        type="text"
                                        value={row.finalValue}
                                        onChange={(e) =>
                                            handleInputChange(index, 'finalValue', e.target.value)
                                        }
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
                                        maxLength={99}
                                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                                        type="text"
                                        value={row.date}
                                        onChange={(e) =>
                                            handleInputChange(index, 'date', e.target.value)
                                        }
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
                                        maxLength={99}
                                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                                        type="text"
                                        value={row.frequency}
                                        onChange={(e) =>
                                            handleInputChange(index, 'frequency', e.target.value)
                                        }
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
                                        maxLength={99}
                                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                                        type="text"
                                        value={row.who}
                                        onChange={(e) =>
                                            handleInputChange(index, 'who', e.target.value)
                                        }
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
                                        maxLength={99}
                                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                                        type="text"
                                        value={row.communicate}
                                        onChange={(e) =>
                                            handleInputChange(index, 'communicate', e.target.value)
                                        }
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
                                        maxLength={99}
                                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                                        type="text"
                                        value={row.expected}
                                        onChange={(e) =>
                                            handleInputChange(index, 'expected', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteRow(index)}
                                        className="rounded-md bg-slate-700 p-1 m-1 text-white text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default NewObjetiveList;
