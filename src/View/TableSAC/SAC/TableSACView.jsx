import React, { useEffect, useState } from 'react';
import getData from '../../../Hooks/getData';
import { Badge, Table } from '@tremor/react';
import ModalView from '../../../Component/Modal/ModalView';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import { fetchDataProcess } from '../../../utils/fetchDataProcess';
import { StatusOnlineIcon, CheckCircleIcon } from '@heroicons/react/solid';
import NewSAC from './NewSAC';
import DeleteSAC from './DeleteSAC';
import ModifySAC from './ModifySAC';

const API_SGI360 = import.meta.env.VITE_API_DATABASE;

async function fetchDataSAC(parametros) {
    try {
        const allData = await getData(`${API_SGI360}/admin/SAC/getSAC.php?${parametros}`);
        return allData;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
}

async function fetchDataStandars() {
    try {
        const all = await getData(`${API_SGI360}/admin/Standar/getStandars.php`);
        return all;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
}

async function fetchDataCode(standar) {
    try {
        const all = await getData(`${API_SGI360}/admin/audit/getCodeAudit.php?standar=${standar}`);
        return all;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
}

function TableSACView() {
    const [dataTable, setDataTable] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [componet, setComponet] = useState("");
    const [action, setAction] = useState("new");

    const [standarArray, setStandarArray] = useState([])
    const [standarNames, setStandarNames] = useState([])
    const [standarInput, setStandarInput] = useState("")

    const [codeArray, setcodeArray] = useState([])
    const [codeAudit, setCodeAudit] = useState([])
    const [codeInput, setCodeInput] = useState("Todos")

    const [processArray, setProcessArray] = useState([])
    const [processName, setProcessName] = useState([])
    const [processInput, setProcessInput] = useState("Todos")

    const arrayYears = Array.from({ length: 27 }, (_, index) => (2023 + index).toString());
    const currentDate = new Date();
    const currentYearFind = currentDate.getFullYear().toString();
    const [yearInput, setYearInput] = useState(currentYearFind)

    const [statusInput, setStatusInput] = useState('Todos')

    const closeModal = () => setIsOpen(false);
    const openModal = () => { setIsOpen(true) };

    const handleRefresh = async () => {
        fetchSAC()
    }

    const handleNew = () => {
        setAction('new');
        const component = <NewSAC handleRefresh={handleRefresh} closeModal={closeModal}
            standarArray={standarArray} getCodes={getCodes}
            processArray={processArray} processName={processName} />;
        setComponet(component);
        openModal();
    }

    const handleModify = ({ item }) => {
        setAction('modify');
        const component = <ModifySAC item={item} handleRefresh={handleRefresh} closeModal={closeModal}
            standarArray={standarArray} getCodes={getCodes}
            processArray={processArray} processName={processName} />;
        setComponet(component);
        openModal();
    }

    const handleDelete = ({ item }) => {
        setAction('delete');
        const component = <DeleteSAC item={item} handleRefresh={handleRefresh} closeModal={closeModal} />;
        setComponet(component);
        openModal();
    }

    const fetchSAC = async () => {
        const parametros = `standar=${encodeURIComponent(standarInput)}&code=${encodeURIComponent(codeInput)}&process_name=${encodeURIComponent(processInput)}&year=${encodeURIComponent(yearInput)}&status=${encodeURIComponent(statusInput)}`
        const allData = await fetchDataSAC(parametros);
        setDataTable(allData)
    };
    const fetchDataStandar = async () => {
        const allData = await fetchDataStandars();
        const namesStandar = allData.map(item => item.name);
        setStandarArray(allData);
        setStandarNames(namesStandar)
    };

    const getCodes = async (value) => {
        const allData = await fetchDataCode(value);
        return allData
    }

    const fetchCode = async (value) => {
        const allData = await fetchDataCode(value);
        setcodeArray(allData)
        const code = allData.map(item => item.audit_code);
        setCodeAudit(code)
    };
    const fetchProcess = async () => {
        try {
            const processData = await fetchDataProcess();
            setProcessArray(processData)
            const nameProcess = processData.map(item => item.name);
            setProcessName(nameProcess)
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    }

    useEffect(() => {
        fetchDataStandar();
        fetchSAC();
        fetchCode(standarInput)
        fetchProcess()
    }, [standarInput, codeInput, processInput, yearInput, statusInput]);

    return (
        <>
            {
                (() => {
                    switch (action) {
                        case 'new':
                            return (
                                <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Registrar nueva SAC"} />
                            );
                        case 'modify':
                            return (
                                <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Modificar SAC"} />
                            );
                        case 'delete':
                            return (
                                <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Eliminar SAC"} />
                            );
                        default:
                            return null;
                    }
                })()
            }
            <div className="flex items-center justify-between">
                <div className='flex'>
                    <div className='m-2 -ml-2'>
                        <span className='text-sm font-semibold' >Estándar</span>
                        <SearchSelectView
                            placeholder="Seleccione un estándar"
                            select={standarInput}
                            setSelectValue={setStandarInput}
                            valores={standarNames}
                        />
                    </div>
                    <div className='m-2'>
                        <span className='text-sm font-semibold' >Código</span>
                        <SearchSelectView
                            placeholder="Seleccione un código"
                            select={codeInput}
                            setSelectValue={setCodeInput}
                            valores={['Todos', ...codeAudit]}
                        />
                    </div>
                    <div className='m-2'>
                        <span className='text-sm font-semibold'>Proceso</span>
                        <SearchSelectView
                            placeholder="Seleccione un proceso"
                            select={processInput}
                            setSelectValue={setProcessInput}
                            valores={['Todos', ...processName]}
                        />
                    </div>
                    <div className='m-2'>
                        <span className='text-sm font-semibold'>Año</span>
                        <SearchSelectView
                            placeholder="Seleccione un año"
                            select={yearInput}
                            setSelectValue={setYearInput}
                            valores={arrayYears}
                        />
                    </div>
                    <div className='m-2'>
                        <span className='text-sm font-semibold'>Estado</span>
                        <SearchSelectView
                            placeholder="Seleccione un estado"
                            select={statusInput}
                            setSelectValue={setStatusInput}
                            valores={['Todos', 'Abierta', 'Cerrada']}
                        />
                    </div>
                </div>
                <div className='flex items-center justify-end w-full'>
                    <button
                        onClick={handleNew}
                        className="rounded-md bg-slate-700 p-2 text-white text-sm">
                        Añadir SAC
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="ml-3 rounded-md bg-slate-700 p-2 text-white text-sm flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className='pb-5 text-sm'>
                Resultados totales: <span className='font-semibold'>{dataTable.length}</span>
            </div>
            <Table>
                <thead className="text-black">
                    <tr>
                        <th>
                            <div className="flex item-center justify-center">
                                Estándar
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Auditoría
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Proceso
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Estado
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Descripción
                            </div>
                        </th>
                        <th></th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-md text-black">
                    {dataTable.map((item, index) => (
                        <tr className={`border-t border-slate-400 ${index % 2 == 0 ? 'bg-slate-100' : ''}`} key={index}>
                            <td className="">
                                <div className="flex item-center justify-center">
                                    {item.standar_name}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center ">
                                    {item.code}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center ">
                                    {item.process_name}
                                </div>
                            </td>

                            <td className="">
                                <div className="flex item-center justify-center ">
                                    {item.sac_status === 'Abierta' ?
                                        <Badge icon={StatusOnlineIcon} color={'teal'}>{item.sac_status}</Badge>
                                        :
                                        <Badge icon={CheckCircleIcon} color={'rose'}>{item.sac_status}</Badge>}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center ">
                                    {item.sac_description}                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center capitalize">
                                    <button
                                        onClick={() => handleModify({ item })}
                                        className='p-1 m-1 bg-slate-700 rounded-lg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete({ item })}
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
            </Table>
        </>
    )
}

export default TableSACView;