import React, { useContext, useEffect, useState } from "react";
import SearchSelectView from "../../../Component/SearchSelect/SearchSelectView";
import { DatePicker, DateRangePicker } from "@tremor/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import getDataAPI from '../../../Hooks/getDataAPI';
import postAPI from '../../../Hooks/postAPI';
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

async function fetchDataStandars() {
  try {
    const allUser = await getDataAPI(`${API_SGI360_NODEJS}/standar`);
    return allUser;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

function NewAudit({ handleRefresh = () => { }, closeModal }) {
  const [standarArray, setStandarArray] = useState([])
  const [standarNames, setStandarNames] = useState([])
  const [codeInput, setCodeInput] = useState("");
  const [standarInput, setStandarInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [startDateInput, setStartDateInput] = useState(dateCurrent);
  const [finishDateInput, setFinishDateInput] = useState(dateCurrent);
  const [typeInput, setTypeInput] = useState("");

  function saveData() {
    const fechaFormateadaInicio = format(startDateInput, "yyyy-MM-dd");
    const fechaFormateadaCierre = format(finishDateInput, "yyyy-MM-dd");
    const standarFind = standarArray.find(item => item.name === standarInput)
    const URL = `${API_SGI360_NODEJS}/audit`;
    const data = {
      code: codeInput.trim(),
      idStandar: parseInt(standarFind.id_standar_pk),
      description: descriptionInput.trim(),
      start_date: fechaFormateadaInicio,
      finish_date: fechaFormateadaCierre,
      type: typeInput.trim(),
      status: 'Abierta'
    };
    console.log(data)
    postAPI(URL, data, closeModal, handleRefresh)
  }

  const isEmpty =
    codeInput.trim() == "" ||
    startDateInput == null ||
    finishDateInput == null ||
    standarInput.trim() == "" ||
    typeInput.trim() == "" ||
    descriptionInput.trim() == "";


  const fetchDataStandar = async () => {
    const allData = await fetchDataStandars();
    setStandarArray(allData);
    const namesStandar = allData.map(item => item.name);
    setStandarNames(namesStandar)
  };

  useEffect(() => {
    fetchDataStandar()
  }, [standarArray])


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
          className="max-w-sm mx-auto"
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
        <div>Estándar</div>
        <SearchSelectView
          placeholder="Seleccione un estándar"
          select={standarInput}
          setSelectValue={setStandarInput}
          valores={standarNames}
        />
        <div>Código</div>
        <input
          maxLength={95}
          type="text"
          value={codeInput}
          onChange={(event) => setCodeInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Descripción</div>
        <textarea
          maxLength={295}
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

export default NewAudit;
