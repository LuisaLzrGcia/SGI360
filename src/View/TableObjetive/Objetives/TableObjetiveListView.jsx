import React, { useState, useEffect } from 'react';
import { fetchDataProcess } from '../../../utils/fetchDataProcess';
import { Table } from '@tremor/react';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import NewObjetiveList from './NewObjetiveList';
import ModalView from '../../../Component/Modal/ModalView';
import getData from '../../../Hooks/getData';
import ModifyObjetiveList from './ModifyObjetiveList';
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const arrayYears = Array.from({ length: 27 }, (_, index) => (2023 + index).toString());

async function fetchDataObjetive(month, year, process) {
  try {
    const URL = `${API_SGI360}/admin/Objetive/getObjetive.php?id_month_fk=${month}&year=${year}&id_process_fk=${process}`;
    const allData = await getData(URL);
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

  const handleDelete = (item) => {
    const isConfirmed = window.confirm("¿Estás seguro de eliminar este objetivo?");
    if (isConfirmed) {
      deleteObjectiveOne(item.id);
    }
  }

  function deleteObjectiveOne(idObjective) {
    const URL = `${API_SGI360}/admin/Objetive/deleteOneObjective.php`;
    const data = {
      id: idObjective,
    };

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'Successfully') {
          alert("Objetivo eliminado")
          handleRefresh()
        } else {
          console.log('Error al insertar');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al intentar guardar los datos');
      });
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
        const processId = processFind.id;
        const monthId = monthNames.indexOf(currentMonth);
        try {
          const data = await fetchDataObjetive((monthId + 1), currentYear, processId);
          setDataTable(data);
        } catch (error) {
          console.error("Error al obtener los datos del objetivo:", error);
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

  return (
    <>
      {(() => {
        switch (action) {
          case 'new':
            return (
              <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Registrar nuevos objetivos"} sizeModal={"w-full"} sizeModalMax={"max-w-6xl"} />
            );
          case 'modify':
            return (
              <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Modificar objetivo"} sizeModal={""} sizeModalMax={""} />
            );
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
                <div className="flex item-center justify-center mx-1">
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
