import { Badge, Card, Table } from '@tremor/react'
import React, { useEffect, useState } from 'react'
import getData from '../../../Hooks/getData';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import { ExclamationCircleIcon, StatusOnlineIcon } from "@heroicons/react/solid";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

async function fetchDataDocument(parametros) {
  try {
    const URL = `${API_SGI360}/manager/getDocumentsManager.php?${parametros}`;
    const allData = await getData(URL);
    return allData;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

function TableDocumentsManager() {

  const [dataTable, setDataTable] = useState([])
  const [typeInput, setTypeInput] = useState('Todos')
  const [statusInput, setStatusInput] = useState('Todos')

  const fetchDocuments = async () => {
    try {
      const processName = sessionStorage.getItem('process_name')
      const parametros = `process_name=${processName}&type=${typeInput}&status=${statusInput}`
      const data = await fetchDataDocument(parametros)
      setDataTable(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [typeInput, statusInput])



  return (
    <>
      <div className='m-3'>
        <Card>
          <div className='flex'>
            <div className='m-2 -ml-2'>
              <span className='text-sm font-semibold' >Tipo</span>
              <SearchSelectView
                placeholder="Seleccione un tipo"
                select={typeInput}
                setSelectValue={setTypeInput}
                valores={['Todos', 'Instructivo', 'Procedimiento']}
              />
            </div>
            <div className='m-2'>
              <span className='text-sm font-semibold' >Estatus</span>
              <SearchSelectView
                placeholder="Seleccione un estatus"
                select={statusInput}
                setSelectValue={setStatusInput}
                valores={['Todos', 'Vigente', 'Vencido']}
              />
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
              </tr>
            </thead>
            <tbody className="text-md text-black">
              {dataTable.map((item, index) => (
                <tr className={`border-t border-slate-400 h-8 ${index % 2 == 0 ? 'bg-slate-100' : ''}`} key={index}>
                  <td className="">
                    <div className="flex item-center justify-center mx-1">
                      {item.type}
                    </div>
                  </td>
                  <td className="">
                    <div className="flex item-center justify-center  mx-1">
                      {item.code}
                    </div>
                  </td>
                  <td className="">
                    <div className="flex item-center justify-center mx-1">
                      {item.title}
                    </div>
                  </td>
                  <td className="">
                    <div className="flex item-center justify-center mx-1">
                      {item.issuance_date}
                    </div>
                  </td>
                  <td className="">
                    <div className="flex item-center justify-center mx-1">
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
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </>
  )
}

export default TableDocumentsManager