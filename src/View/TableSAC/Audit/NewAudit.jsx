import React, { useContext, useEffect, useState } from "react";
import SearchSelectView from "../../../Component/SearchSelect/SearchSelectView";
import { DatePicker } from "@tremor/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

function NewAudit({ handleRefresh = () => { }, closeModal, standarArray }) {
  const namesStandar = standarArray.map(item => item.name);
  const [standarName, setStandarName] = useState(namesStandar)
  const [codeInput, setCodeInput] = useState("");
  const [standarInput, setStandarInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [startDateInput, setStartDateInput] = useState("");
  const [finishDateInput, setFinishDateInput] = useState("");
  const [typeInput, setTypeInput] = useState("");

  function saveData() {

    const fechaFormateadaInicio = format(startDateInput, "yyyy-MM-dd");
    const fechaFormateadaCierre = format(finishDateInput, "yyyy-MM-dd");
    const standarFind = standarArray.find(item => item.name === standarInput)
    const URL = `${API_SGI360}/admin/audit/insertAudit.php`;
    const data = {
      code: codeInput.trim(),
      id_standar: parseInt(standarFind.id.trim()),
      description: descriptionInput.trim(),
      start_date: fechaFormateadaInicio,
      finish_date: fechaFormateadaCierre,
      type: typeInput.trim(),
      status: 'Abierta'

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
          handleRefresh()
          closeModal();
        } else {
          console.log('Error al insertar');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al intentar guardar los datos');
      });
  }

  const isEmpty =
    codeInput.trim() == "" ||
    startDateInput == "" ||
    finishDateInput == "" ||
    standarInput.trim() == "" ||
    typeInput.trim() == "" ||
    descriptionInput.trim() == "";

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Fecha de inicio</div>
        <DatePicker
          locale={es}
          placeholder="Selecione un fecha de inicio"
          onValueChange={setStartDateInput}
        />
        <div>Fecha de cierre</div>
        <DatePicker
          locale={es}
          placeholder="Selecione un fecha de cierre"
          onValueChange={setFinishDateInput}
        />
        <div>Tipo</div>
        <SearchSelectView
          placeholder="Seleccione un tipo"
          select={typeInput}
          setSelectValue={setTypeInput}
          valores={['Interna', 'Externa']}
        />
        <div>Código</div>
        <input
          type="text"
          value={codeInput}
          onChange={(event) => setCodeInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Estándar</div>
        <SearchSelectView
          placeholder="Seleccione un estándar"
          select={standarInput}
          setSelectValue={setStandarInput}
          valores={standarName}
        />
        <div>Descripción</div>
        <textarea
          cols="5" rows=""
          value={descriptionInput}
          onChange={(event) => setDescriptionInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        ></textarea>
        <button
          onClick={saveData}
          disabled={isEmpty}
          className={`rounded-md p-2 text-white text-sm mt-1 ${isEmpty? 'bg-slate-500':'bg-slate-700'}
            `}
        >
          Guardar datos
        </button>
      </div >
    </>
  );
}

export default NewAudit;
