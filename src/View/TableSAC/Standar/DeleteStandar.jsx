import React, { useContext, useEffect, useState } from "react";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;
import deleteAPI from "../../../Hooks/deleteAPI"

function DeleteStandar({ item, handleRefresh = () => { }, closeModal }) {
  const idStandar = item.id_standar_pk;
  const [nameInput, setNameInput] = useState(item.name);
  const [descriptionInput, setDescriptionInput] = useState(item.description);

  function saveData() {
    const URL = `${API_SGI360_NODEJS}/standar/${idStandar}`;
    deleteAPI(URL, closeModal, handleRefresh)
  }

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <h1 className="font-bold text-center my-1">
          ¿Esta seguro de eliminar este estándar?
        </h1>
        <div>Nombre del estándar</div>
        <input
          type="text"
          value={nameInput}
          disabled={true}
          onChange={(event) => setNameInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Descripción</div>
        <input
          value={descriptionInput}
          disabled={true}
          onChange={(event) => setDescriptionInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <button
          onClick={saveData}
          disabled={nameInput === "" || descriptionInput === ""}
          className={`rounded-md p-2 text-white text-sm mt-1 ${nameInput === "" || descriptionInput === ""
            ? "bg-slate-500"
            : "bg-slate-700"
            }`}
        >
          Eliminar datos
        </button>
      </div>
    </>
  );
}

export default DeleteStandar;
