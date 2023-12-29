import React, { useState, useEffect } from 'react';
import { fetchDataProcess } from '../../../utils/fetchDataProcess';
import { Table } from '@tremor/react';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import NewObjetiveList from './NewObjetiveList';
import ModalView from '../../../Component/Modal/ModalView';
import getData from '../../../Hooks/getData';
import ModifyObjetiveList from './ModifyObjetiveList';
import getDataAPI from "../../../Hooks/getDataAPI";
import deleteAPI from "../../../Hooks/deleteAPI";
import TablePerspective from './TablePerspective';
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const arrayYears = Array.from({ length: 27 }, (_, index) => (2023 + index).toString());

async function fetchDataObjetive(month, year, process) {
  try {
    const URL = `${API_SGI360_NODEJS}/objective/${month}/${year}/${encodeURI(process)}`;
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


function TableObjetiveListView() {
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

  const handleNew = () => {
    setAction('new');
    const newProcessComponent = <NewObjetiveList closeModal={closeModal} arrayProcess={dataProcess} arrayYears={arrayYears} handleRefresh={handleRefresh} />;
    setComponet(newProcessComponent);
    openModal();
  }

  const handleModify = (item) => {
    setAction('modify');
    const newProcessComponent = <ModifyObjetiveList closeModal={closeModal} handleRefresh={handleRefresh} item={item} />;
    setComponet(newProcessComponent);
    openModal();
  }

  const handlePerspective = (item) => {
    setAction('perspective');
    const component = <TablePerspective />;
    setComponet(component);
    openModal();
  }

  const handleDelete = (item) => {
    const isConfirmed = window.confirm("¿Estás seguro de eliminar este objetivo?");
    if (isConfirmed) {
      deleteObjectiveOne(item.id_objetive_pk);
    }
  }

  function deleteObjectiveOne(idObjective) {
    const URL = `${API_SGI360_NODEJS}/objective/${idObjective}`;
    deleteAPI(URL, closeModal, handleRefresh)
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
      const monthId = monthNames.indexOf(currentMonth);
      try {
        const data = await fetchDataObjetive((monthId + 1), currentYear, nameProcessInput);
        setDataTable(data);
      } catch (error) {
        console.error("Error al obtener los datos del objetivo:", error);
        setDataTable([]);
      }
    }

    if (nameProcessInput == "" || nameProcessInput == undefined || currentMonth == "" || currentMonth == undefined || currentYear == "" || currentYear == undefined) {
      setDataTable([]);
    }
  };


  useEffect(() => {
    fetchDataForObjetive();
  }, [nameProcessInput, currentMonth, currentYear]);

  return (
    <>
      {(() => {
        switch (action) {
          case 'new':
            return (
              <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Registrar nuevos objetivos"} sizeModal={"w-screen"} sizeModalMax={"max-w-8xl"} />
            );
          case 'modify':
            return (
              <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Modificar objetivo"} sizeModal={"w-1/2"} sizeModalMax={"w-1/2"} />
            );
          case 'perspective':
            return (
              <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Tabla de perspectivas"} sizeModal={"w-1/3"} sizeModalMax={""} />
            );
            defa
          default:
            return null;
        }
      })()}
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
          <div className='m-2'>
            <button
              onClick={handleNew}
              className="rounded-md bg-slate-700 p-2 text-white text-sm">
              Añadir objetivos
            </button>
          </div>
          <button
            onClick={handleRefresh}
            className="rounded-md bg-slate-700 p-2 text-white text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
          <div className='m-2'>
            <button
              onClick={handlePerspective}
              className="rounded-md bg-slate-700 p-2 text-white text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

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
            <td></td>
          </tr>
        </thead>
        <tbody className="text-md text-black">
          {dataTable.map((item, index) => (
            <tr className={`border-t border-slate-400 ${index % 2 == 0 ? 'bg-slate-100' : ''}`} key={index}>
              <td className="">
                <div className="flex item-center justify-center text-center mx-1">
                  {item.perspective}
                </div>
              </td>
              <td className="">
                <div className="flex item-center justify-center text-center mx-1">
                  {item.application}
                </div>
              </td>
              <td className="">
                <div className="flex item-center justify-center text-center mx-1">
                  {item.objective}
                </div>
              </td>
              <td className="">
                <div className="flex item-center justify-center text-center mx-1">
                  {item.expected}
                </div>
              </td>
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
      </Table >
    </>
  );
}

export default TableObjetiveListView;
