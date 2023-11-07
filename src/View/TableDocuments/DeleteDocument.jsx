import React, { useContext, useEffect, useState } from "react";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;
import SelectView from "../../Component/Select/SelectView";
import getData from "../../Hooks/getData";
import SearchSelectView from "../../Component/SearchSelect/SearchSelectView";
import { DatePicker } from "@tremor/react";
import DatePickerView from "../../Component/DatePicker/DatePickerView";
import { format } from "date-fns";
import { es } from "date-fns/locale";

async function fetchDataProcess() {
  try {
    const data = await getData(`${API_SGI360}/admin/Process/nameProcess.php`);
    return data
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

function DeleteDocument({ data, processes, refresh, closeModal }) {
  const processName = processes.map(item => item.name);
  processName.sort((a, b) => a.localeCompare(b));
  const [idDocument, setIdDocument] = useState(data.id)

  const fechaString = data.issuance_date;
  const partesFecha = fechaString.split("-");
  const fechaObjeto = new Date(`${partesFecha[2]}-${partesFecha[1]}-${parseInt(partesFecha[0]) + 1}`);
  const [issuanceDateInput, setIssuanceDateInput] = useState(fechaObjeto)

  function saveData() {
    const URL = `${API_SGI360}/admin/Documents/deleteDocument.php`;
    const data = {
      id: parseInt(idDocument),
    };
    console.log(JSON.stringify(data))
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.status == 'Successfully') {
          alert("Datos eliminados");
          closeModal();
          refresh()
        } else {
          console.log('Error al insertar');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al intentar guardar los datos');
      });
  }

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div className="grid grid-cols-3 mb-2">
          <div>Tipo</div>
          <input
            type="text"
            value={data.type}
            disabled="false"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Proceso</div>
          <input
            type="text"
            value={data.process}
            disabled="false"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Fecha de emisión</div>
          <input
            type="text"
            value={data.issuance_date}
            disabled="false"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Fecha de vigencia</div>
          <input
            type="text"
            value={data.effective_date}
            disabled="false"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Estado</div>
          <input
            type="text"
            value={data.status}
            disabled="false"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Código</div>
          <input
            type="text"
            value={data.code}
            disabled="false"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Título</div>
          <textarea
            value={data.title}
            disabled="false"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
            name="" id="" cols="30" rows="2">
          </textarea>
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Revisor</div>
          <input
            type="text"
            value={data.reviewer}
            disabled="false"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Autorizador</div>
          <input
            type="text"
            value={data.autorizer}
            disabled="false"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <button
          onClick={saveData}
          className={`rounded-md p-2 text-white text-sm mt-1 bg-slate-700`}
        >
          Eliminar datos
        </button>
      </div>
    </>
  );
}

export default DeleteDocument;
