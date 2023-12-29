import React, { useState, useEffect } from 'react';
import { fetchDataProcess } from '../../../utils/fetchDataProcess';
import { Badge, BadgeDelta, Table } from '@tremor/react';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import ModalView from '../../../Component/Modal/ModalView';
import getDataAPI from "../../../Hooks/getDataAPI";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

import {
  InformationCircleIcon, XCircleIcon, CheckCircleIcon
} from "@heroicons/react/outline";
import ModifyObjetiveList from './ModifyAchievement';
import ModifyAchievement from './ModifyAchievement';
import TableByProcess from './TableByProcess';
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const arrayYears = Array.from({ length: 27 }, (_, index) => (2023 + index).toString());

async function fetchDataObjetive(month, year, process) {
  try {
    const URL = `${API_SGI360_NODEJS}/objective/${month}/${year}/${process}`;
    const allData = await getDataAPI(URL);
    if (!allData) {
      console.error("No se encontraron datos");
      return [];
    }
    return allData;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

function TableAchievementView() {
  const [dataProcess, setDataProcess] = useState([]);
  const nameProcess = dataProcess.map(item => item.name);
  const [nameProcessInput, setNameProcessInput] = useState()
  const currentDate = new Date();
  const currentMonthFind = monthNames[currentDate.getMonth()];
  const [currentMonth, setCurrentMonth] = useState(currentMonthFind);
  const currentYearFind = currentDate.getFullYear();
  const [currentYear, setCurrentYear] = useState(currentYearFind.toString());
  const [isOpen, setIsOpen] = useState(false);
  const [componet, setComponet] = useState("");
  const [action, setAction] = useState("new");
  const [dataTable, setDataTable] = useState([])


  const closeModal = () => setIsOpen(false);
  const openModal = () => { setIsOpen(true) };

  const handleRefresh = () => {
    fetchDataForObjetive()
  }

  const handleTable = () => {
    setAction('table');
    const tableComponent = <TableByProcess />;
    setComponet(tableComponent);
    openModal();
  }

  const handleModify = (item) => {
    setAction('modify');
    const newProcessComponent = <ModifyAchievement closeModal={closeModal} handleRefresh={handleRefresh} item={item} />;
    setComponet(newProcessComponent);
    openModal();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processData = await fetchDataProcess();
        setDataProcess(processData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchData()
  }, [dataProcess])

  const fetchDataForObjetive = async () => {
    if (nameProcessInput != undefined && currentMonth != "" && currentYear != "") {
      const processFind = dataProcess.find(item => item.name == nameProcessInput);
      if (processFind) {
        const monthId = monthNames.indexOf(currentMonth);
        try {
          const data = await fetchDataObjetive((monthId + 1), currentYear, nameProcessInput);
          setDataTable(data);
        } catch (error) {
          alert("Error al obtener los datos del objetivo:", error);
          setDataTable([]);
        }
      }
    }
    if (nameProcessInput == "" || nameProcessInput == undefined || currentMonth == "" || currentMonth == undefined || currentYear == "" || currentYear == undefined) {
      setDataTable([])
    }
  }

  useEffect(() => {
    fetchDataForObjetive();
  }, [nameProcessInput, currentMonth, currentYear]);


  const setData = async () => {
    const allData = await fetchDataObjetive();
    setDataTable(allData);
  }

  return (
    <>
      {
        (() => {
          switch (action) {
            case 'table':
              return (
                <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Objetivos por proceso"} sizeModal={"w-full"} sizeModalMax={"max-w-7xl"} />
              );
            case 'modify':
              return (
                <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Modificar cumplimiento"} sizeModal={""} sizeModalMax={""} />
              );
            // case 'delete':
            //   return (
            //     <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Eliminar proceso"} />
            //   );
            default:
              return null;
          }
        })()
      }
      <div className="flex items-center justify-between">
        <div className='flex'>
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
            <span className='text-sm font-semibold' >Mes</span>
            <SearchSelectView
              placeholder="Seleccione un mes"
              select={currentMonth}
              setSelectValue={setCurrentMonth}
              valores={monthNames}
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
        </div>
        <div className='flex items-center justify-center m-2'>
          <button
            onClick={handleRefresh}
            className="mx-1 rounded-md bg-slate-700 p-2 text-white text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
          <button
            onClick={handleTable}
            className="mx-1 rounded-md bg-slate-700 p-2 text-white text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
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
                Esperado
              </div>
            </th>
            <th>
              <div className="flex item-center justify-center">
                Actual
              </div>
            </th>
            <th>
              <div className="flex item-center justify-center">
                Cumplimiento
              </div>
            </th>
            <th>
              <div className="flex item-center justify-center">
                Estado
              </div>
            </th>
            <td></td>
          </tr>
        </thead>
        <tbody className="text-md text-black">
          {dataTable.map((item, index) => (
            <tr key={index} className={`border-t border-slate-400 ${index % 2 == 0 ? 'bg-slate-100' : ''}`}>
              <td className="">
                <div className="flex item-center justify-center mx-1">
                  {item.perspective}
                </div>
              </td>
              <td className="">
                <div className="flex item-center justify-center  mx-1">
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
                  {item.expected}
                </div>
              </td>
              <td className="">
                <div className="flex item-center justify-center mx-1">
                  {item.current}
                </div>
              </td>
              <td className="">
                <div className="flex item-center justify-center mx-1">
                  {`${item.achievement}%`}
                </div>
              </td>
              <td className="">
                <div className="flex item-center justify-center mx-1">
                  {item.status === 'Sin datos' && (
                    <Badge color={'yellow'} icon={InformationCircleIcon}>
                      {item.status}
                    </Badge>
                  )}
                  {item.status === 'No cumple' && (
                    <Badge color={'red'} icon={XCircleIcon}>
                      {item.status}
                    </Badge>
                  )}
                  {item.status === 'Cumple' && (
                    <Badge color={'green'} icon={CheckCircleIcon}>
                      {item.status}
                    </Badge>
                  )}
                </div>

              </td>
              <td>
                <button
                  onClick={() => handleModify(item)}
                  className='p-1 m-1 bg-slate-700 rounded-lg'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table >
    </>
  );
}

export default TableAchievementView