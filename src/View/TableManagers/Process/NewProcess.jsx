import React, { useState } from "react";
import postAPI from "../../../Hooks/postAPI";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;


function NewProcess({ setData = "", closeModal, updateData }) {
  const [nameInput, setNameInput] = useState("");
  const [abbreviationInput, setAbbreviationInput] = useState("");
  function saveData() {
    const URL = `${API_SGI360_NODEJS}/process`;
    const data = {
      newNameProcess: nameInput,
      newAbbreviation: abbreviationInput,
      newPowerBI: "NULL"
    };

    postAPI(URL, data, closeModal, updateData)
  }


  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Nombre del proceso</div>
        <input
          maxLength={195}
          type="text"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Abreviación</div>
        <input
          maxLength={95}
          value={abbreviationInput}
          onChange={(event) => setAbbreviationInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <button
          onClick={saveData}
          disabled={nameInput === "" || abbreviationInput === ""}
          className={`rounded-md p-2 text-white text-sm mt-1 ${nameInput === "" || abbreviationInput === ""
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

export default NewProcess;
