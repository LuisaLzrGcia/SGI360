import React, { useContext, useEffect, useState } from "react";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;
import postAPI from '../../../Hooks/postAPI';


function NewStandar({ handleRefresh = () => { }, closeModal }) {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  function saveData() {
    const URL = `${API_SGI360_NODEJS}/standar`;
    const data = {
      name: nameInput,
      description: descriptionInput
    };
    postAPI(URL, data, closeModal, handleRefresh)
  }

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Nombre del estándar</div>
        <input
          type="text"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Descripción</div>
        <input
          value={descriptionInput}
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
          Guardar datos
        </button>
      </div>
    </>
  );
}

export default NewStandar;
