import React, { useEffect, useState } from "react";
import getData from "../../../Hooks/getData";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

const ModifyProcess = ({ data = "", setData = "", closeModal}) => {
  const [process, setProcess] = useState(data.name)
  const [abbreviation, setAbbreviation] = useState(data.abbreviation)

  const saveData = async () => {
    const update = await getData(
      `${API_SGI360}/admin/Process/updateProcess.php?processId=${encodeURIComponent(data.id)}&newNameProcess=${encodeURIComponent(process)}&newAbbreviation=${encodeURIComponent(abbreviation)}`
    );
    if (update == 'Successfully') {
      alert("Datos guardados");
      setData()
      closeModal();
    } else {
      alert("Error al intentar guardar los datos");
    }
  }
  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Nombre del proceso</div>
        <input type="text"
          value={process}
          onChange={(event) => setProcess(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Abreviación</div>
        <input
          value={abbreviation}
          onChange={(event) => setAbbreviation(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <button
          onClick={saveData}
          disabled={process === "" || abbreviation === ""}
          className={`rounded-md p-2 text-white text-sm mt-1 ${process === "" || abbreviation === "" ? 'bg-slate-500' : 'bg-slate-700'}`}
        >
          Guardar datos
        </button>
      </div>
    </>
  )
};
export default ModifyProcess;