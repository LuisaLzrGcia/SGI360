import React, { useContext, useEffect, useState } from "react";
import SearchSelectView from "../../../Component/SearchSelect/SearchSelectView";
import { DatePicker } from "@tremor/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import putAPI from "../../../Hooks/putAPI";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

function ModifyAudit({ item, handleRefresh = () => { }, closeModal, standarArray }) {
  const namesStandar = standarArray.map(item => item.name);
  const [standarName, setStandarName] = useState(namesStandar)
  const [codeInput, setCodeInput] = useState(item.audit_code);
  const [standarInput, setStandarInput] = useState(item.standar_name);
  const [descriptionInput, setDescriptionInput] = useState(item.audit_description);

  const fechaInicio = (item.formattedStartDate).split('-');
  const fechaInicioFomateada = new Date(fechaInicio[2], fechaInicio[1] - 1, fechaInicio[0]);
  const [startDateInput, setStartDateInput] = useState(fechaInicioFomateada);
  const fechaFin = (item.formattedFinishDate).split('-');
  const fechaFinFomateada = new Date(fechaFin[2], fechaFin[1] - 1, fechaFin[0]);
  const [finishDateInput, setFinishDateInput] = useState(fechaFinFomateada);

  const [typeInput, setTypeInput] = useState(item.audit_type);
  const [statusInput, setStatusInput] = useState(item.audit_status)

  function saveData() {

    const fechaFormateadaInicio = format(startDateInput, "yyyy-MM-dd");
    const fechaFormateadaCierre = format(finishDateInput, "yyyy-MM-dd");
    const standarFind = standarArray.find(item => item.name === standarInput)
    const URL = `${API_SGI360_NODEJS}/audit`;
    const data = {
      code: codeInput.trim(),
      idStandar: parseInt(standarFind.id_standar_pk),
      description: descriptionInput.trim(),
      startDate: fechaFormateadaInicio,
      finishDate: fechaFormateadaCierre,
      type: typeInput.trim(),
      status: statusInput,
      idAudit: item.id_audit_pk
    };
    putAPI(URL, data, closeModal, handleRefresh)
  }

  const isEmpty =
    codeInput.trim() == "" ||
    startDateInput == "" ||
    finishDateInput == "" ||
    standarInput.trim() == "" ||
    typeInput == "" ||
    descriptionInput.trim() == "";

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Fecha de inicio</div>
        <DatePicker
          locale={es}
          placeholder="Selecione un fecha de inicio"
          onValueChange={setStartDateInput}
          value={startDateInput}
        />
        <div>Fecha de cierre</div>
        <DatePicker
          locale={es}
          placeholder="Selecione un fecha de cierre"
          onValueChange={setFinishDateInput}
          value={finishDateInput}
        />
        <div>Tipo</div>
        <SearchSelectView
          placeholder="Seleccione un tipo"
          select={typeInput}
          setSelectValue={setTypeInput}
          valores={['Interna', 'Externa']}
        />
        <div>Estado</div>
        <SearchSelectView
          placeholder="Seleccione un tipo"
          select={statusInput}
          setSelectValue={setStatusInput}
          valores={['Abierta', 'Cerrada']}
        />
        <div>Estándar</div>
        <SearchSelectView
          placeholder="Seleccione un estándar"
          select={standarInput}
          setSelectValue={setStandarInput}
          valores={standarName}
        />
        <div>Código</div>
        <input
          type="text"
          value={codeInput}
          onChange={(event) => setCodeInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
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
          className={`rounded-md p-2 text-white text-sm mt-1 ${isEmpty ? 'bg-slate-500' : 'bg-slate-700'}
            `}
        >
          Guardar datos
        </button>
      </div >
    </>
  );
}

export default ModifyAudit;
