import React, { useRef } from 'react';
import { CheckCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { Table } from '@tremor/react';

function TableAchievementByProcess({dataTable = [], nameProcess }) {
    const tableRef = useRef(null);

    const generarBadge = (valor) => {
        if (valor === 'Cumple') {
            return <CheckCircleIcon className="text-green-500 w-6" />;
        } else if (valor === 'No cumple') {
            return <XCircleIcon className="text-red-500 w-6" />;
        } else {
            return <InformationCircleIcon className="text-yellow-500 w-6" />;
        }
    };

    return (
        <>
            <Table ref={tableRef}>
                <thead className="text-black">
                    <tr>
                        <th>
                            <div className="flex item-center justify-center">
                                Perspectiva
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Aplicación
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Objetivo
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Ene
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Feb
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Mar
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Abr
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                May
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Jun
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Jul
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Ago
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Sep
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Oct
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Nov
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Dic
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: '11px' }} className="text-black">
                    {dataTable.map((item, index) => (
                        <tr className={`border-t border-slate-400 ${index % 2 == 0 ? 'bg-slate-100' : ''}`} key={index}>
                            <td className="text-center">
                                <div className="flex item-center justify-center mx-1">
                                    {item.perspective}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {item.application}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {item.objective}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {generarBadge(item.Enero)}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center  mx-1">
                                    {generarBadge(item.Febrero)}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {generarBadge(item.Marzo)}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {generarBadge(item.Abril)}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {generarBadge(item.Mayo)}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {generarBadge(item.Junio)}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {generarBadge(item.Julio)}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {generarBadge(item.Agosto)}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {generarBadge(item.Septiembre)}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {generarBadge(item.Octubre)}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {generarBadge(item.Noviembre)}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center mx-1">
                                    {generarBadge(item.Diciembre)}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table >
        </>
    )
}

export default TableAchievementByProcess