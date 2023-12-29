import React, { useEffect, useState } from 'react';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import { Table } from '@tremor/react';
import getDataAPI from '../../../Hooks/getDataAPI';
import postAPI from '../../../Hooks/postAPI';
import putAPI from '../../../Hooks/putAPI';
import deleteAPI from '../../../Hooks/deleteAPI';
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

async function fetchDataPerspective() {
    try {
        const URL = `${API_SGI360_NODEJS}/perspective/`;
        const all = await getDataAPI(URL);
        return all;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
}

function TablePerspective() {
    const [dataTable, setDataTable] = useState([])

    const handleNew = () => {
        const data = prompt("Ingrese la nueva perspectiva")
        if (data === '' || data === null) {
            alert("Valor no válido")
        } else {
            const URL = `${API_SGI360_NODEJS}/perspective`;
            postAPI(URL, { perspective: data.trim() })
        }
    }

    const handleModify = (item) => {
        const updatePerspective = prompt("Modifique la perspectiva", `${item.perspective}`);
        if (updatePerspective === '' || updatePerspective === null) {
            alert("Valor no válido");
        } else {
            const URL = `${API_SGI360_NODEJS}/perspective`;
            const data = {
                idPerspective: item.id_perspective_pk,
                newPerspective: updatePerspective.trim()
            }
            putAPI(URL, data);
        }
    };


    const handleDelete = (item) => {
        const isSure = window.confirm(`¿Estás seguro de eliminar la perspectiva "${item.perspective}"?`);
        if (isSure) {
            const URL = `${API_SGI360_NODEJS}/perspective/${item.id_perspective_pk}`;
            deleteAPI(URL)
        } else {
            alert("Eliminación cancelada")
        }
    };


    const getDataStandar = async () => {
        const allData = await fetchDataPerspective();
        setDataTable(allData);
    };

    useEffect(() => {
        getDataStandar()
    }, [dataTable])


    return (
        <>
            <div className="pb-5 items-center ">
                <div className='flex justify-end mt-1'>
                    <button
                        className="rounded-md bg-slate-700 p-1 m-1 text-white text-sm"
                        onClick={() => handleNew()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    </button>
                </div>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="text-center">No</th>
                            <th className="text-center">Perspectiva</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTable.map((item, index) => (
                            <tr className={`border-t border-slate-400 ${index % 2 == 0 ? 'bg-slate-100' : ''}`} key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'>{item.perspective}</td>
                                <td>

                                    <div className='flex items-center justify-end'>
                                        <button
                                            onClick={() => handleModify(item)}
                                            className='p-1 m-1 bg-slate-700 rounded-lg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className={`p-1 m-1 rounded-lg bg-slate-700`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TablePerspective;
