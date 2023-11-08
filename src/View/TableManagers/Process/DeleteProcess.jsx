import React, { useContext, useEffect, useState } from "react";
import { SGIContext } from "../../../Context/SGIContext";
import getData from "../../../Hooks/getData";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

const DeleteProcess = ({ data = "", updateData, closeModal }) => {
  const { id, name, abbreviation } = data;

  const deleteDataUser = async (id) => {
    const deleteProcess = await getData(
      `${API_SGI360}/admin/Process/deleteProcess.php?idProcess=${encodeURIComponent(id)}`
    );
    return deleteProcess;

  };

  const handleDelete = async () => {
    const statusDelete = await deleteDataUser(id);
    if (statusDelete == 'Successfully') {
      updateData()
      closeModal();
    } else {
      alert("Error al intentar eliminar usuario");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <h1 className="font-bold text-center my-1">
          ¿Esta seguro de eliminar este proceso?
        </h1>
        <div>Nombre del proceso</div>
        <input type="text"
          value={name}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Abreviación</div>
        <input
          value={abbreviation}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <button
          onClick={() => handleDelete()}
          className={`rounded-md p-2 text-white text-sm bg-slate-700 mt-2`}
        >
          Eliminar proceso
        </button>
      </div>
    </>
  )
};

export default DeleteProcess;