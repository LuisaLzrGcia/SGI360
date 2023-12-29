import React, { useState } from 'react';
import { CheckCircleIcon, StatusOnlineIcon } from "@heroicons/react/outline"
import { Badge, Table } from "@tremor/react"
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;
import getDataAPI from '../../../Hooks/getDataAPI';
import ModalView from '../../../Component/Modal/ModalView';
import TableACbySACView from '../../../View/TableSAC/AC/TableACbySACView';

async function fetchAC(audit, sac) {
    if (audit != '' && sac != '') {
        try {
            const url = `${API_SGI360_NODEJS}/ac/${encodeURI(audit)}/${encodeURI(sac)}`
            const all = await getDataAPI(url);
            return all;
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            return [];
        }
    } else {
        return []
    }
}

function TableView({ dataTable = [] }) {
    const [dataTableAC, setDataTableAC] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [componet, setComponet] = useState("");
    const [action, setAction] = useState("ac");

    const closeModal = () => setIsOpen(false);
    const openModal = () => { setIsOpen(true) };

    const handleAC = async (audit = "", sac = "") => {
        if (audit == "" || sac == "") {
        } else {
            try {
                const data = await fetchAC(audit, sac);
                setAction('ac');
                const component = <TableACbySACView dataTable={data} />;
                setComponet(component);
                openModal();
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        }
    }

    return (
        <>
            {
                (() => {
                    switch (action) {
                        case 'ac':
                            return (
                                <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Acciones correctivas"} sizeModal='w-1/2' sizeModalMax='w-full' />
                            );
                        default:
                            return null;
                    }
                })()
            }
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
                                    {item.audit_code}
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
                            <td>
                                <button
                                    onClick={() => handleAC(item.audit_code, item.sac_code)}
                                    className={`p-1 m-1 rounded-lg bg-slate-700`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default TableView