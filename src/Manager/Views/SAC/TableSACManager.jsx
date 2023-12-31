import React, { useEffect, useState } from 'react';
import { Badge, Card, Table } from '@tremor/react';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import { fetchDataProcess } from '../../../utils/fetchDataProcess';
import { StatusOnlineIcon, CheckCircleIcon } from '@heroicons/react/solid';
import getDataAPI from '../../../Hooks/getDataAPI';
import TableView from './TableView';
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

async function fetchDataStandars() {
  try {
    const all = await getDataAPI(`${API_SGI360_NODEJS}/standar`);
    return all;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

async function fetchDataCode(standar, year) {
  if (standar != '' && year != '') {
    try {
      const all = await getDataAPI(`${API_SGI360_NODEJS}/audit/standar/${encodeURI(standar)}/${year}`);
      return all;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
    }
  }
}

function TableSACManager() {
  const [dataTable, setDataTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [componet, setComponet] = useState("");
  const [action, setAction] = useState("new");

  const [standarArray, setStandarArray] = useState([])
  const [standarNames, setStandarNames] = useState([])
  const [standarInput, setStandarInput] = useState("")

  const [codeArray, setcodeArray] = useState([])
  const [codeAudit, setCodeAudit] = useState([])
  const [codeInput, setCodeInput] = useState("Todos")

  const [processArray, setProcessArray] = useState([])
  const [processName, setProcessName] = useState([])
  const [processInput, setProcessInput] = useState("Todos")

  const arrayYears = Array.from({ length: 27 }, (_, index) => (2023 + index).toString());
  const currentDate = new Date();
  const currentYearFind = currentDate.getFullYear().toString();
  const [yearInput, setYearInput] = useState(currentYearFind)

  const [statusInput, setStatusInput] = useState('Todos')

  const handleRefresh = async () => {
    fetchSAC()
  }

  const fetchSAC = async () => {
    const processName = sessionStorage.getItem('process_name')
    try {
      const data = {
        standar: standarInput,
        code: codeInput,
        year: yearInput,
        status: statusInput,
        process: processName
      };
      const URL = `${API_SGI360_NODEJS}/sac/filter`;
      const dataSAC = await getDataAPI(URL, "POST", data);
      setDataTable(dataSAC);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const fetchDataStandar = async () => {
    const allData = await fetchDataStandars();
    const namesStandar = allData.map(item => item.name);
    setStandarArray(allData);
    setStandarNames(namesStandar)
  };

  const fetchCode = async (value) => {
    if (value !== '' && value !== null) {
      const allData = await fetchDataCode(value, yearInput);
      setcodeArray(allData);
      const code = allData.map(item => item.audit_code);
      setCodeAudit(code);
    } else {
      setCodeAudit([]);
    }
  };
  const fetchProcess = async () => {
    try {
      const processData = await fetchDataProcess();
      setProcessArray(processData)
      const nameProcess = processData.map(item => item.name);
      setProcessName(nameProcess)
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

  useEffect(() => {
    fetchDataStandar();
    if (standarInput !== '' || yearInput !== '') {
      fetchCode(standarInput)
      fetchSAC();
    }
    fetchProcess()
  }, [standarInput, codeInput, processInput, yearInput, statusInput]);
  return (
    <>
      <div className='m-3'>
        <Card>
          <div className="flex items-center justify-between">
            <div className='flex'>
              <div className='m-2 -ml-2'>
                <span className='text-sm font-semibold' >Estándar</span>
                <SearchSelectView
                  placeholder="Seleccione un estándar"
                  select={standarInput}
                  setSelectValue={setStandarInput}
                  valores={standarNames}
                />
              </div>
              <div className='m-2'>
                <span className='text-sm font-semibold' >Código</span>
                <SearchSelectView
                  placeholder="Seleccione un código"
                  select={codeInput}
                  setSelectValue={setCodeInput}
                  valores={['Todos', ...codeAudit]}
                />
              </div>
              <div className='m-2'>
                <span className='text-sm font-semibold'>Año</span>
                <SearchSelectView
                  placeholder="Seleccione un año"
                  select={yearInput}
                  setSelectValue={setYearInput}
                  valores={arrayYears}
                />
              </div>
              <div className='m-2'>
                <span className='text-sm font-semibold'>Estado</span>
                <SearchSelectView
                  placeholder="Seleccione un estado"
                  select={statusInput}
                  setSelectValue={setStatusInput}
                  valores={['Todos', 'Abierta', 'Cerrada']}
                />
              </div>
            </div>
            <div className='flex items-center justify-end w-full'>
              <button
                onClick={handleRefresh}
                className="ml-3 rounded-md bg-slate-700 p-2 text-white text-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>
          </div>
          <div className='pb-5 text-sm'>
            Resultados totales: <span className='font-semibold'>{dataTable.length}</span>
          </div>
          {dataTable.length > 0 ? (
            <TableView dataTable={dataTable}/>
          ) : (
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
                  <th></th>
                  <th>
                  </th>
                </tr>
              </thead>
              <tbody className="text-md text-black">
                <tr>
                  <th colSpan={6} className='text-center text-3xl p-3'>
                    NO HAY RESULTADOS
                  </th>
                </tr>
              </tbody>
            </Table>
          )}
        </Card>
      </div>
    </>
  )
}

export default TableSACManager;