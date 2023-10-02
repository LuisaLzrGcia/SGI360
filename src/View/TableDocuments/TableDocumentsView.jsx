import { Badge, Card, TabPanel, Table } from '@tremor/react';
import React, { useEffect, useState } from 'react';
import getData from '../../Hooks/getData';
import NewDocument from './NewDocument';
import ModalView from '../../Component/Modal/ModalView';
import { ClockIcon, ExclamationCircleIcon, StatusOnlineIcon } from "@heroicons/react/solid";


const API_SGI360 = import.meta.env.VITE_API_DATABASE;
async function fetchDataDocuments() {
  try {
    const data = await getData(`${API_SGI360}/admin/Documents/allDocuments.php`);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}
async function fetchDataProcess() {
  try {
    const data = await getData(`${API_SGI360}/admin/Process/nameProcess.php`);
    return data
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

export default function TableDocumentsView() {
  const [data, setData] = useState([])
  const [action, setAction] = useState("new");
  const [componet, setComponet] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [arrayProcesses, setArrayProcesses] = useState([])

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleRefresh = async () => {
    const allData = await fetchDataDocuments();
  }
  const processes = async () => {
    const allData = await fetchDataProcess();
    return allData;
  }

  const handleNew = async () => {
    setAction('new');

    try {
      const process = await processes();
      const arrayProcesses = process.map(item => item.name);
      arrayProcesses.sort((a, b) => a.localeCompare(b));
      const newComponent = <NewDocument arrayProcesses={arrayProcesses} closeModal={closeModal} />;
      setComponet(newComponent);
      openModal();
    } catch (error) {
      console.error("Error al obtener los procesos:", error);
    }
  }

  useEffect(() => {
    async function fetchDataAsync() {
      const allData = await fetchDataDocuments();
      setData(allData);
    }
    fetchDataAsync();
  }, []);

  return (
    <>
      {
        (() => {
          switch (action) {
            case 'new':
              return (
                <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Registrar nuevo documento"} sizeModal={'w-1/2'} />
              );
            default:
              return null;
          }
        })()
      }
      <div className='m-3'>
        <Card>
          <div className="pb-5 flex items-center justify-between">
            <div className='flex items-center justify-start'>
              <button
                onClick={handleNew}
                className="rounded-md bg-slate-700 p-2 text-white text-sm">
                Añadir documento
              </button>
            </div>
            <div className='flex items-center justify-center'>
            </div>
            <div className='flex items-center justify-end'>
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
                    Tipo
                  </div>
                </th>
                <th>
                  <div className="flex item-center justify-center">
                    Código
                  </div>
                </th>
                <th>
                  <div className="flex item-center justify-center">
                    Título
                  </div>
                </th>
                <th>
                  <div className="flex item-center justify-center">
                    Vigencia
                  </div>
                </th>
                <th>
                  <div className="flex item-center justify-center">
                    Estatus
                  </div>
                </th>
                <th>
                  <div className="flex item-center justify-center">
                    Proceso
                  </div>
                </th>
                <th>
                </th>
              </tr>
            </thead>
            <tbody className="text-md text-black">
              {data.map((item, index) => (
                <tr className="border-t border-slate-400" key={index}>
                  <td className="w-1/12">
                    <div className="flex item-center justify-center">
                      {item.type}
                    </div>
                  </td>
                  <td className="w-2/12">
                    <div className="flex item-center justify-center ">
                      {item.code}
                    </div>
                  </td>
                  <td className="w-5/12">
                    <div className="flex item-center justify-center">
                      {item.title}
                    </div>
                  </td>
                  <td className="">
                    <div className="flex item-center justify-center ">
                      {item.effective_date}
                    </div>
                  </td>
                  <td className="">
                    <div className="flex item-center justify-center ">
                      {
                        (() => {
                          switch (item.status) {
                            case 'Vigente':
                              return (
                                <Badge color="emerald" size="xs" icon={StatusOnlineIcon}>{item.status}</Badge>
                              );
                            case 'Vencido':
                              return (
                                <Badge color="red" size="xs" icon={ExclamationCircleIcon}>{item.status}</Badge>
                              );
                            case 'Por vencer':
                              return (
                                <Badge color="yellow" size="xs" icon={ExclamationCircleIcon}>{item.status}</Badge>
                              );
                            default:
                              return null;
                          }
                        })()
                      }
                    </div>
                  </td>
                  <td className="">
                    <div className="flex item-center justify-center ">
                      {item.process}
                    </div>
                  </td>
                  <td className="">
                    <div className="flex item-center justify-center capitalize">
                      <button
                        className='p-1 m-1 bg-slate-700 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      <button
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
        </Card>
      </div>
    </>
  );
}