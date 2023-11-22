import React, { useContext, useEffect, useState } from "react";
import { getDateSQLFormated } from "../../Hooks/dateSQLFormated";
import deleteAPI from "../../Hooks/deleteAPI";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

function DeleteDocument({ data, processes, refresh, closeModal }) {
  const processName = processes.map(item => item.name);
  processName.sort((a, b) => a.localeCompare(b));
  console.log(data)
  const [idDocument, setIdDocument] = useState(data.id_document_pk)

  const fechaString = data.issuance_date;
  const partesFecha = fechaString.split("-");
  const fechaObjeto = new Date(`${partesFecha[2]}-${partesFecha[1]}-${parseInt(partesFecha[0]) + 1}`);
  const [issuanceDateInput, setIssuanceDateInput] = useState(getDateSQLFormated(data.issuance_date))

  function saveData() {
    const URL = `${API_SGI360_NODEJS}/documents/${idDocument}`;
    deleteAPI(URL, closeModal, refresh)
  }

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div className="grid grid-cols-3 mb-2">
          <div>Tipo</div>
          <input
            type="text"
            value={data.type}
            disabled={true}
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Proceso</div>
          <input
            type="text"
            value={data.process_name}
            disabled={true}
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Fecha de emisión</div>
          <input
            type="text"
            value={data.issuance_date_formated}
            disabled={true}
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Fecha de vigencia</div>
          <input
            type="text"
            value={data.effective_date_formated}
            disabled={true}
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Estado</div>
          <input
            type="text"
            value={data.status}
            disabled={true}
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Código</div>
          <input
            type="text"
            value={data.code}
            disabled={true}
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Título</div>
          <textarea
            value={data.title}
            disabled={true}
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
            name="" id="" cols="30" rows="2">
          </textarea>
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Revisor</div>
          <input
            type="text"
            value={data.reviewer}
            disabled={true}
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2" />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Autorizador</div>
          <input
            type="text"
            value={data.autorizer}
            disabled={true}
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
