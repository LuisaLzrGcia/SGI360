import React, { useEffect, useState } from 'react';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import { Table } from '@tremor/react';
const API_SGI360 = import.meta.env.VITE_API_DATABASE;


function NewObjetiveList({ closeModal, arrayProcess, arrayYears, handleRefresh = () => { } }) {
    const [dataProcess, setDataProcess] = useState(arrayProcess);
    const nameProcess = arrayProcess.map(item => item.name);
    const [nameProcessInput, setNameProcessInput] = useState("Gerencia")
    const currentDate = new Date();
    const currentYearFind = currentDate.getFullYear();
    const [currentYear, setCurrentYear] = useState(currentYearFind.toString());

    const [tableData, setTableData] = useState([]);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Guardar objetivos");


    const handleAddRow = () => {
        const processFind = arrayProcess.find(item => item.name == nameProcessInput)
        const newRow = {
            year: parseInt(currentYear),
            perspective: '',
            application: '',
            objective: '',
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
        try {
            setIsLoading(true);
            setLoadingMessage("Guardando...");

            const processFind = arrayProcess.find((item) => item.name === nameProcessInput);

            const dataToSave = tableData.map((row) => ({
                perspective: row.perspective,
                application: row.application,
                objective: row.objective,
                expected: row.expected,
                year: parseInt(currentYear),
                idProcess: parseInt(processFind.id),
            }));

            const URL = `${API_SGI360}/admin/Objetive/insertObjetive.php`;

            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
            });

            const result = await response.json();

            if (result.status === 'Successfully') {
                alert("Datos guardados");
                handleRefresh();
                closeModal();
            } else {
                console.log('Error al insertar');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al intentar guardar los datos');
        } finally {
            setIsLoading(false);
            setLoadingMessage("Guardar objetivos");
        }
    };


    const isAnyInputEmpty = () => {
        return tableData.some((row) => Object.values(row).some(value => value === ''));
    };

    useEffect(() => {
        handleAddRow();
        handleAddRow();
    }, [arrayProcess]);

    useEffect(() => {
        setIsSaveDisabled(isAnyInputEmpty());
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
                            <th><div className="flex item-center justify-center">Perspectiva</div></th>
                            <th><div className="flex item-center justify-center">Aplicación</div></th>
                            <th><div className="flex item-center justify-center">Objetivo</div></th>
                            <th><div className="flex item-center justify-center">Esperado</div></th>
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
                                        valores={["Calidad", "Financiera", "People", "Seguridad y salud en el trabajo", "Sustentabilidad", "Business and functional performance"]}
                                    />
                                </td>
                                <td className='p-1'>
                                    <input
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
