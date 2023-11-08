import React, { useEffect, useState } from 'react';
import getData from '../../../Hooks/getData';
import { Table } from '@tremor/react';
import PaginationView from '../../../Component/Pagination/PaginationView';
import ModalView from '../../../Component/Modal/ModalView';
import ModifyProcess from './ModifyProcess';
import NewProcess from './NewProcess';
import DeleteProcess from './DeleteProcess';

const API_SGI360 = import.meta.env.VITE_API_DATABASE;

async function fetchData() {
  try {
    const allUser = await getData(`${API_SGI360}/admin/Process/allProcess.php`);
    return allUser;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}
async function fetchDataLenght() {
  try {
    const processLength = await getData(`${API_SGI360}/admin/Process/processLength.php`);
    // Aquí continúas con el código si la llamada fue exitosa
    return processLength
  } catch (error) {
    // Aquí manejas el error
    console.error("Error al obtener datos:", error);
  }
}

const url = `${API_SGI360}/admin/Process/allProcess.php`

export default function TableProcessView() {

  const [dataProcess, setDataProcess] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [componet, setComponet] = useState("");
  const [action, setAction] = useState("new");
  const [length, setLength] = useState(0)


  const closeModal = () => setIsOpen(false);
  const openModal = () => { setIsOpen(true) };

  const handleNew = () => {
    setAction('new');
    const newProcessComponent = <NewProcess setData={setDataProcess} closeModal={closeModal} updateData={updateData}/>;
    setComponet(newProcessComponent);
    openModal();
  }

  const handleModify = ({ item }) => {
    setAction('modify');
    const updateProcessComponent = <ModifyProcess data={item} setData={handleRefresh} closeModal={closeModal} />;
    setComponet(updateProcessComponent);
    openModal();
  }

  const handleDelete = ({ item }) => {
    setAction('delete');
    const updateComponent = <DeleteProcess data={item} updateData={updateData} closeModal={closeModal} />;
    setComponet(updateComponent);
    openModal();
  }

  const updateData = async () => {
    const allProcess = await getData(url + pageCurrent);
    setCurrentItems(allProcess)
    const processLength = fetchDataLenght();
    setLength(processLength)
  }


  useEffect(() => {
    async function fetchDataAsync() {
      const allProcessData = await fetchData();
      setDataProcess(allProcessData);
    }
    fetchDataAsync();
  }, []);

  const handleRefresh = async () => {
    const allProcessData = await fetchData();
    setDataProcess(allProcessData);
  }
  return (
    <>
      {
        (() => {
          switch (action) {
            case 'new':
              return (
                <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Registrar nuevo proceso"} />
              );
            case 'modify':
              return (
                <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Modificar proceso"} />
              );
            case 'delete':
              return (
                <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Eliminar proceso"} />
              );
            default:
              return null;
          }
        })()
      }
      <div className="pb-5 flex items-center justify-between">
        <div className='flex items-center justify-start w-1/6'>
          <button
            onClick={handleNew}
            className="rounded-md bg-slate-700 p-2 text-white text-sm">
            Añadir proceso
          </button>
        </div>
        <div className='flex items-center justify-center w-4/6'>
        </div>
        <div className='flex items-center justify-end w-1/6'>
          <button
            onClick={handleRefresh}
            className="ml-3 rounded-md bg-slate-700 p-2 text-white text-sm flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>
      </div>
      <Table>
        <thead className="text-black">
          <tr>
            <th>
              <div className="flex item-center justify-center">
                Proceso
              </div>
            </th>
            <th>
              <div className="flex item-center justify-center">
                Abreviación
              </div>
            </th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody className="text-md text-black">
          {dataProcess.map((item, index) => (
            <tr className={`border-t border-slate-400 ${index % 2 == 0 ? 'bg-slate-100' : ''}`} key={index}>
              <td className="">
                <div className="flex item-center justify-center">
                  {item.name}
                </div>
              </td>
              <td className="">
                <div className="flex item-center justify-center ">
                  {item.abbreviation}
                </div>
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
                    disabled={item.id == 1}
                    onClick={() => handleDelete({ item })}
                    className={`p-1 m-1 rounded-lg ${item.id == 1 ? 'bg-slate-500' : 'bg-slate-700'}`}>
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
  );
}