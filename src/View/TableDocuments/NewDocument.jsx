import React, { useContext, useEffect, useState } from "react";
import SelectView from "../../Component/Select/SelectView";
import SearchSelectView from "../../Component/SearchSelect/SearchSelectView";
import { DatePicker } from "@tremor/react";
import { es } from "date-fns/locale";
import { getDateSQLFormated, setDateSQLFormated } from "../../Hooks/dateSQLFormated";
import postAPI from "../../Hooks/postAPI";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

function NewDocument({ processes, closeModal, handleRefresh = () => { } }) {
  const [arrayProcess, setArrayProcess] = useState(processes)
  const processName = processes.map(item => item.name);
  processName.sort((a, b) => a.localeCompare(b));
  const [nameProcess, setNameProcess] = useState(processName)
  const [typeInput, setTypeInput] = useState("Instructivo")
  const [processInput, setProcessInput] = useState("")
  const [codeInput, setCodeInput] = useState("")
  const [titleInput, setTitleInput] = useState("")
  const [reviewerInput, setReviewerInput] = useState("")
  const [autorizerInput, setAutorizerInput] = useState("")
  const [issuanceDateInput, setIssuanceDateInput] = useState("")
  const [daysInput, setDaysInput] = useState(1096)

  function saveData() {
    const processFind = arrayProcess.find(item => item.name === processInput)
    const issuanceDateFormated = setDateSQLFormated(issuanceDateInput)
    const URL = `${API_SGI360_NODEJS}/documents`;
    const data = {
      newType: typeInput,
      newCode: codeInput,
      newTitle: titleInput,
      newReviewer: reviewerInput,
      newAutorizer: autorizerInput,
      newIssuanceDate: issuanceDateFormated,
      newDays: daysInput,
      newProcess: parseInt(processFind.id_process_pk)
    };
    console.log(data)

    postAPI(URL, data, closeModal, handleRefresh);
  }
  const isEmpty =
    typeInput == "" ||
    processInput == "" ||
    issuanceDateInput == null ||
    codeInput.trim() == "" ||
    reviewerInput.trim() == "" ||
    autorizerInput.trim() == "" ||
    daysInput == "";

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
              valores={nameProcess}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Fecha de emisión</div>
          <DatePicker
            locale={es}
            className="col-span-2"
            placeholder="Selecione un fecha de emisión"
            onValueChange={setIssuanceDateInput}
          />
        </div>
        <div className="grid grid-cols-3 mb-2">
          <div>Código</div>
          <input
            maxLength={50}
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
            type="number"
            className="px-2 py-1 border rounded-md bg-gray-50 col-span-2"
          />
        </div>
        <button
          onClick={saveData}
          disabled={isEmpty}
          className={`rounded-md p-2 text-white text-sm mt-1 ${isEmpty ? 'bg-slate-500' : 'bg-slate-700'}
            `}
        >
          Guardar datos
        </button>
      </div>
    </>
  );
}

export default NewDocument;
