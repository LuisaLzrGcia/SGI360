import React from 'react';
import { CheckCircleIcon, StatusOnlineIcon } from '@heroicons/react/solid';
import { Badge, Table } from '@tremor/react';

function TableACbySACView({ dataTable = [] }) {
    return (
        <>
            <div className='pb-5 text-sm'>
                Resultados totales: <span className='font-semibold'>{dataTable.length}</span>
            </div>
            {dataTable.length > 0 ? (
                <Table>
                    <thead className="text-black">
                        <tr>
                            <th>
                                <div className="flex item-center justify-center">
                                    Auditoria
                                </div>
                            </th>
                            <th>
                                <div className="flex item-center justify-center">
                                    SAC
                                </div>
                            </th>
                            <th>
                                <div className="flex item-center justify-center">
                                    # AC
                                </div>
                            </th>
                            <th>
                                <div className="flex item-center justify-center">
                                    Descripción
                                </div>
                            </th>
                            <th>
                                <div className="flex item-center justify-center">
                                    Responsable
                                </div>
                            </th>
                            <th>
                                <div className="flex item-center justify-center">
                                    Estado
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-md text-black">
                        {dataTable.map((item, index) => (
                            <tr className={`border-t border-slate-400 ${index % 2 === 0 ? 'bg-slate-100' : ''}`} key={index}>
                                <td className="text-center">
                                    <div className="flex item-center justify-center">
                                        {item.audit_code}
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="flex item-center justify-center">
                                        {item.sac_code}
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="flex item-center justify-center ">
                                        {`AC${index + 1}`}
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="flex item-center justify-center ">
                                        {item.ac_description}
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="flex item-center justify-center ">
                                        {item.ac_responsible}
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="flex item-center justify-center ">
                                        {item.ac_status === 'Abierta' ?
                                            <Badge icon={StatusOnlineIcon} color={'teal'}>{item.ac_status}</Badge>
                                            :
                                            <Badge icon={CheckCircleIcon} color={'rose'}>{item.ac_status}</Badge>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div className='text-center text-3xl p-3 w-full'>
                    SIN RESULTADOS
                </div>
            )}
        </>
    );
}

export default TableACbySACView;
