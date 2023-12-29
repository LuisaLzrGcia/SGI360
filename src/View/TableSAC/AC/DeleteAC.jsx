import React, { useContext, useEffect, useState } from "react";
import SearchSelectView from "../../../Component/SearchSelect/SearchSelectView";
import deleteAPI from '../../../Hooks/deleteAPI';
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

function DeleteAC({ item, handleRefresh = () => { }, closeModal }) {

  const [sacInput, setSacInput] = useState(item.sac_code)
  const [descriptionInput, setDescriptionInput] = useState(item.ac_description)
  const [responsibleInput, setResponsibleInput] = useState(item.ac_responsible)
  const [statusInput, setStatusInput] = useState(item.ac_status)


  function saveData() {
    const URL = `${API_SGI360_NODEJS}/ac/${item.ac_id}`;
    deleteAPI(URL, closeModal, handleRefresh);
  }

  const isEmpty =
    statusInput === "" ||
    descriptionInput === "" ||
    responsibleInput === "";

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>SAC</div>
        <input
          type="text"
          value={sacInput}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Estado</div>
        <input
          type="text"
          value={statusInput}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Descripción</div>
        <textarea
          cols="5" rows=""
          maxLength="390"
          disabled={true}
          value={descriptionInput}
          className="px-2 py-1 border rounded-md bg-gray-50"
        ></textarea>
        <div>Responsable</div>
        <textarea
          cols="5" rows=""
          maxLength="390"
          disabled={true}
          value={responsibleInput}
          className="px-2 py-1 border rounded-md bg-gray-50"
        ></textarea>
        <button
          onClick={saveData}
          disabled={isEmpty}
          className={`rounded-md p-2 text-white text-sm mt-1 ${isEmpty ? 'bg-slate-500' : 'bg-slate-700'}`}
        >
          Eliminar datos
        </button>
      </div>


    </>
  );
}

export default DeleteAC;
