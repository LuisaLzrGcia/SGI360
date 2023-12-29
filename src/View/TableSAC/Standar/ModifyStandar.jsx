import React, { useState } from "react";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;
import putAPI from "../../../Hooks/putAPI"


function ModifyStandar({ item, handleRefresh = () => { }, closeModal }) {
  const idStandar = item.id_standar_pk;
  const [nameInput, setNameInput] = useState(item.name);
  const [descriptionInput, setDescriptionInput] = useState(item.description);

  function saveData() {
    const URL = `${API_SGI360_NODEJS}/standar`;
    const data = {
      name: nameInput,
      description: descriptionInput,
      idStandar: idStandar
    };

    putAPI(URL, data, closeModal, handleRefresh)
  }

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Nombre del estándar</div>
        <input
          maxLength={95}
          type="text"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Descripción</div>
        <input
          maxLength={395}
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

export default ModifyStandar;
