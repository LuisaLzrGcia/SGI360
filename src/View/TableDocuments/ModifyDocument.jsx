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

function ModifyDocument({ data, processes, refresh, closeModal }) {
  const processName = processes.map(item => item.name);
  processName.sort((a, b) => a.localeCompare(b));
  const [idDocument, setIdDocument] = useState(data.id)
  const [nameProcesses, setNameProcesses] = useState(processName)
  const [typeInput, setTypeInput] = useState(data.type)
  const [processInput, setProcessInput] = useState(data.process)
  const [codeInput, setCodeInput] = useState(data.code)
  const [titleInput, setTitleInput] = useState(data.title)
  const [reviewerInput, setReviewerInput] = useState(data.reviewer)
  const [autorizerInput, setAutorizerInput] = useState(data.autorizer)
  const fechaString = data.issuance_date;
  const partesFecha = fechaString.split("-");
  const fechaObjeto = new Date(`${partesFecha[2]}-${partesFecha[1]}-${parseInt(partesFecha[0]) + 1}`);
  const [issuanceDateInput, setIssuanceDateInput] = useState(fechaObjeto)
  const [daysInput, setDaysInput] = useState(data.days)

  function saveData() {
    const processFind = processes.find(item => item.name === processInput)
    const fechaFormateada = format(issuanceDateInput, "yyyy-MM-dd");
    const URL = `${API_SGI360}/admin/Documents/updateDocument.php`;
    const data = {
      id: idDocument,
      newType: typeInput,
      newCode: codeInput,
      newTitle: titleInput,
      newReviewer: reviewerInput,
      newAutorizer: autorizerInput,
      newIssuanceDate: fechaFormateada,
      newDays: parseInt(daysInput),
      newProcess: parseInt(processFind.id)
    };
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
          alert("Datos guardados");
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
          <div className="col-span-2">
            <SelectView
              select={typeInput}
              selectValue={setTypeInput}
              onChange={(event) => setTypeInput(event.target.value)}
              valores={["Instructivo", "Procedimiento"]} />
          </div>
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Proceso</div>
          <div className="col-span-2">
            <SearchSelectView
              placeholder="Seleccione un proceso"
              select={processInput}
              setSelectValue={setProcessInput}
              valores={nameProcesses}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Fecha de emisión</div>
          <DatePicker
            className="col-span-2"
            placeholder="Selecione un fecha de emisión"
            onValueChange={setIssuanceDateInput}
            locale={es}
            value={issuanceDateInput}
          />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Código</div>
          <input
            value={codeInput}
            onChange={(event) => setCodeInput(event.target.value)}
            type="text"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Título</div>
          <textarea
            value={titleInput}
            onChange={(event) => setTitleInput(event.target.value)}
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
            name="" id="" cols="30" rows="2">
          </textarea>
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Revisor</div>
          <input
            value={reviewerInput}
            onChange={(event) => setReviewerInput(event.target.value)}
            type="text"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Autorizador</div>
          <input
            value={autorizerInput}
            onChange={(event) => setAutorizerInput(event.target.value)}
            type="text"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Días</div>
          <input
            value={daysInput}
            onChange={(event) => setDaysInput(event.target.value)}
            type="text"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
          />
        </div>
        <button
          onClick={saveData}
          className={`rounded-md p-2 text-white text-sm mt-1 bg-slate-700`}
        >
          Guardar datos
        </button>
      </div>
    </>
  );
}

export default ModifyDocument;
