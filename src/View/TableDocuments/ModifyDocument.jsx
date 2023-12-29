import React, { useContext, useEffect, useState } from "react";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;
import SelectView from "../../Component/Select/SelectView";
import SearchSelectView from "../../Component/SearchSelect/SearchSelectView";
import { DatePicker } from "@tremor/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import putAPI from "../../Hooks/putAPI";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;
import { pad } from '../../Hooks/dateSQLFormated';

function ModifyDocument({ data, processes, refresh, closeModal }) {
  const processName = processes.map(item => item.name);
  processName.sort((a, b) => a.localeCompare(b));
  const [idDocument, setIdDocument] = useState(data.id_document_pk)
  const [nameProcesses, setNameProcesses] = useState(processName)
  const [typeInput, setTypeInput] = useState(data.type)
  const [processInput, setProcessInput] = useState(data.process_name)
  const [codeInput, setCodeInput] = useState(data.code)
  const [titleInput, setTitleInput] = useState(data.title)
  const [reviewerInput, setReviewerInput] = useState(data.reviewer)
  const [autorizerInput, setAutorizerInput] = useState(data.autorizer)

  const date = new Date(data.issuance_date);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Los meses en JavaScript son de 0 a 11
  const day = pad(date.getDate());

  const [issuanceDateInput, setIssuanceDateInput] = useState(new Date(year, month, day));

  const [daysInput, setDaysInput] = useState(data.days)

  function saveData() {
    const processFind = processes.find(item => item.name === processInput)
    const fechaFormateada = format(issuanceDateInput, "yyyy-MM-dd");
    const URL = `${API_SGI360_NODEJS}/documents`;
    const data = {
      idDocument: idDocument,
      newType: typeInput,
      newCode: codeInput,
      newTitle: titleInput,
      newReviewer: reviewerInput,
      newAutorizer: autorizerInput,
      newIssuanceDate: fechaFormateada,
      newDays: parseInt(daysInput),
      newProcess: parseInt(processFind.id_process_pk)
    };
    putAPI(URL, data, closeModal, refresh);
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
            maxLength={55}
            value={codeInput}
            onChange={(event) => setCodeInput(event.target.value)}
            type="text"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Título</div>
          <textarea
            maxLength={395}
            value={titleInput}
            onChange={(event) => setTitleInput(event.target.value)}
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
            name="" id="" cols="30" rows="2">
          </textarea>
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Revisor</div>
          <input
            maxLength={395}
            value={reviewerInput}
            onChange={(event) => setReviewerInput(event.target.value)}
            type="text"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Autorizador</div>
          <input
            maxLength={395}
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
