import { Table } from '@tremor/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { RiFileExcel2Line } from 'react-icons/ri';
import logoPMV from '../../../assets/logo.png'

function exportTableToExcel(tableRef, filename = '') {
    const dataType = 'application/vnd.ms-excel';
    const tableHTML = tableRef.current.outerHTML;
    filename = filename ? `${filename}.xls` : 'excel_data.xls';
    const blob = new Blob(['\ufeff', '<html xmlns:x="urn:schemas-microsoft-com:office:excel">', tableHTML, '</html>'], {
        type: dataType,
    });
    const objectURL = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = objectURL;
    downloadLink.download = filename;
    downloadLink.click();
    URL.revokeObjectURL(objectURL);
    document.body.removeChild(downloadLink);
}


function TableCurrentByProcess({ dataTable = [], nameProcess = "", responsible = { process_name: 'Null', first_name: 'Null', last_name: 'Null' } }) {
    const [responsibleData, setResponsibleData] = useState(responsible)
    const tableRef = useRef(null);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;

    const headers = [
        'Perspectiva',
        'Aplicación',
        'Objetivo',
        'Unidad de medida',
        'Consulta',
        'Valor inicial',
        'Valor esperado',
        'Fecha',
        'Frecuencia',
        'Quiém',
        'Comunicar'
    ];

    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];
    useEffect(() => {
        if (!responsibleData) {
            alert("No hay usuarios asignado a este proceso")
        }
    }, [responsibleData])

    return (
        <>
            <div className='w-full flex justify-end'>
                <button
                    style={{ backgroundColor: '#1F6E43' }}
                    className="rounded-md p-2 text-white text-sm  flex items-center"
                    onClick={() => exportTableToExcel(tableRef, `Objetivos ${nameProcess} ${months[month - 1]}-${year}`)}
                >
                    <RiFileExcel2Line />
                    <span className="ml-1">Descargar excel</span>
                </button>
            </div>
            <div className='overflow-x-scroll'>
                <table ref={tableRef} className='m-3'>
                    <thead className="text-black">
                        <tr>
                            <th colSpan={2} rowSpan={2}> <img src={logoPMV} alt="" srcSet="" /> </th>
                            <th></th>
                        </tr>
                        <tr></tr>
                        <tr></tr>
                        <tr>
                            <th></th>
                            <th colSpan={1}
                                style={{ textAlign: 'left' }}>
                                OBJETIVO DE EMPRESA
                            </th>
                            <th style={{ border: '1px solid black' }}>0</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th colSpan={1}
                                style={{ textAlign: 'left' }}
                            >OBJETIVO DE PROCESO
                            </th>
                            <th style={{ border: '1px solid black' }}>X</th>
                        </tr>
                        <tr></tr>
                        <tr>
                            <th></th>
                            <th colSpan={1}
                                style={
                                    {
                                        textAlign: 'left',
                                        border: '1px solid black'
                                    }}>
                                PROCESO:
                            </th>
                            <th colSpan={1} className='text-left'
                                style={{
                                    textAlign: 'left',
                                    fontSize: '20px',
                                    border: '1px solid black'
                                }}>
                                {responsible.process_name}
                            </th>
                        </tr>
                        <tr>
                            <th></th>
                            <th colSpan={1}
                                style={
                                    {
                                        textAlign: 'left',
                                        border: '1px solid black'
                                    }}>
                                RESPONSABLE:
                            </th>
                            <th colSpan={1} className='text-left'
                                style={{
                                    textAlign: 'left',
                                    fontSize: '20px',
                                    border: '1px solid black'
                                }}>
                                {`${responsible.first_name} ${responsible.last_name}`}
                            </th>
                            <th></th>
                            <th colSpan={1} className='text-left'>
                                Fecha: {formattedDate}
                            </th>
                        </tr>
                        <tr className=''>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th style={{ backgroundColor: 'white', padding: '5px', color: 'white' }}>.</th>
                            {months.map((month, index) => (
                                <th key={index}
                                    colSpan={2} style={{
                                        backgroundColor: '#009EA8',
                                        color: '#FFFFFF',
                                        border: '0.5px solid black',
                                        borderTop: '1px solid black',
                                        borderRight: '1px solid black',
                                        borderLeft: index === 0 ? '1px solid black' : '',
                                        width: '4rem'
                                    }}>
                                    <div className="flex item-center justify-center">
                                        {month}
                                    </div>
                                </th>
                            ))}

                        </tr>
                        <tr className='bg-oficial text-white'>
                            {headers.map((header, index) => (
                                <th key={index}
                                    style={{
                                        backgroundColor: '#009EA8', color: '#FFFFFF',
                                        border: '0.5px solid black',
                                        borderTop: '1px solid black',
                                        textAlign: 'center',
                                        borderBottom: '1px solid black',
                                        borderLeft: index === 0 ? '1px solid black' : '',
                                        borderRight: index === (dataTable.length - 1) ? '1px solid black' : '',
                                        width: '2rem'
                                    }}>
                                    <div className="flex item-center justify-center">
                                        {header}
                                    </div>
                                </th>
                            ))}
                            <th style={{ backgroundColor: '#FFFFFF', padding: '5px', width: '5px' }}> </th>
                            {Array(months.length * 2).fill().map((_, index) => (
                                <th key={index}
                                    style={{
                                        backgroundColor: '#009EA8', color: '#FFFFFF',
                                        border: '0.5px solid black',
                                        borderRight: '1px solid black',
                                        borderBottom: '1px solid black',
                                        borderTop: '1px solid black',
                                        borderLeft: '1px solid black'
                                    }}>
                                    <div className="flex item-center justify-center px-2">
                                        {index % 2 === 0 ? 'Esperado' : 'Real'}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '12px' }} className="text-black">
                        {dataTable.map((item, index) => (
                            <tr
                                key={index}
                                style={{
                                    backgroundColor: index % 2 === 0 ? '#E2E8F0' : '',
                                }}>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderLeft: '1px solid black',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.perspective}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.application}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.objective}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.measurement}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.consult}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.initialValue}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.finalValue}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.date}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.frequency}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.who}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderRight: '1px solid black',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.communicate}
                                    </div>
                                </td>
                                <td
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        color: 'white'
                                    }}> .  </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderLeft: '1px solid black',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Enero_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Enero_current}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Febrero_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Febrero_current}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Marzo_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Marzo_current}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Abril_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Abril_current}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Mayo_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Mayo_current}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Junio_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Junio_current}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Julio_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Julio_current}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Agosto_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Agosto_current}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Septiembre_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Septiembre_current}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Octubre_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Octubre_current}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Noviembre_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Noviembre_current}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center mx-1">
                                        {item.Diciembre_expected}
                                    </div>
                                </td>
                                <td style={{
                                    border: '0.5px solid black',
                                    textAlign: 'center',
                                    verticalAlign: 'middle',
                                    borderRight: '1px solid black',
                                    borderBottom: index === dataTable.length - 1 ? '1px solid black' : ''
                                }}>
                                    <div className="flex item-center justify-center  mx-1">
                                        {item.Diciembre_current}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div>
        </>
    )
}

export default TableCurrentByProcess;