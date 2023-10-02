import React, { useContext, useEffect, useState } from "react";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;
import SelectView from "../../Component/Select/SelectView";
import getData from "../../Hooks/getData";
import SearchSelectView from "../../Component/SearchSelect/SearchSelectView";
import { DatePicker } from "@tremor/react";
import DatePickerView from "../../Component/DatePicker/DatePickerView";
import { format } from "date-fns";
function NewDocument({ arrayProcesses, closeModal }) {
  const [typeInput, setTypeInput] = useState("Instructivo")
  const [processInput, setProcessInput] = useState("")
  const [codeInput, setCodeInput] = useState("")
  const [titleInput, setTitleInput] = useState("")
  const [reviewerInput, setReviewerInput] = useState("")
  const [autorizerInput, setAutorizerInput] = useState("")
  const [issuanceDateInput, setIssuanceDateInput] = useState("")
  const [daysInput, setDaysInput] = useState(1096)

  function saveData() {
    const URL = `${API_SGI360}/admin/Process/insertProcess.php`;
    const data = {
      newNameProcess: nameInput,
      newAbbreviation: abbreviationInput
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
        if (result.status === 'Successfully') {
          alert("Datos guardados");
          setData(`${API_SGI360}/admin/Process/allProcess.php`)
          closeModal();
        } else {
          console.log('Error al insertar');
        }
        alert(result.status);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al intentar guardar los datos');
      });
  }

  function prueba() {
    // Asegurarse de que issuanceDateInput es una cadena antes de dividirla
    const issuanceDateAsString = String(issuanceDateInput);

    const fechaOriginal = new Date(issuanceDateInput);
    // Formatear la fecha en el formato deseado (por ejemplo, "dd/MM/yyyy" para México)
    const formatoDeseado = "dd/MM/yyyy";
    const fechaFormateada = format(fechaOriginal, formatoDeseado);

    console.log(fechaFormateada);

   
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
              valores={arrayProcesses}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Fecha de emisión</div>
          <DatePicker
            className="col-span-2"
            onValueChange={setIssuanceDateInput}
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
          onClick={prueba}
          className={`rounded-md p-2 text-white text-sm mt-1 bg-slate-700`}
        >
          Guardar datos
        </button>
      </div>
    </>
  );
}

export default NewDocument;
