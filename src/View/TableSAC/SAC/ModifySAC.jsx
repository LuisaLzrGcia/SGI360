import React, { useContext, useEffect, useState } from "react";
import SearchSelectView from "../../../Component/SearchSelect/SearchSelectView";
import putAPI from '../../../Hooks/putAPI';
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

function ModifySAC({ item, handleRefresh = () => { }, closeModal, standarArray, getCodes, processArray, processName }) {
  console.log(item)
  const namesStandar = standarArray.map(item => item.name);
  const [standarName, setStandarName] = useState(namesStandar)
  const [standarInput, setStandarInput] = useState(item.standar_name);

  const [codeArray, setcodeArray] = useState([])
  const [codeStandarArray, setCodeStandarArray] = useState([])
  const [codeInput, setCodeInput] = useState(item.audit_code);

  const [processInput, setProcessInput] = useState(item.process_name)
  const [statusInput, setStatusInput] = useState(item.sac_status)

  const [codeSacInput, setCodeSacInput] = useState(item.sac_code);
  const [descriptionInput, setDescriptionInput] = useState(item.sac_description || '');

  const [actionCorrectiveList, setActionCorrectiveList] = useState([{ idSAC: item.id_sac_pk, id: 1, AC: "AC1", description: "", responsible: "", status: "Abierta" }]);


  useEffect(() => {
    getCodes(standarInput)
      .then((codes) => {
        setcodeArray(codes);
        const codeStandar = codes.map(item => item.audit_code);
        setCodeStandarArray(codeStandar);
      })
      .catch((error) => {
        console.error('Error al obtener los códigos:', error);
      });
  }, [standarInput]);

  function saveData() {
    console.log(actionCorrectiveList)
    const codeFind = codeArray.find(item => item.audit_code === codeInput)
    const processFind = processArray.find(item => item.name === processInput)
    const URL = `${API_SGI360_NODEJS}/sac`;
    const data = {
      idSac: item.id_sac_pk,
      code: parseInt(codeFind.id_audit_pk),
      description: descriptionInput.trim(),
      status: statusInput,
      idProcess: parseInt(processFind.id_process_pk),
      codeSac: codeSacInput.trim()
    };
    console.log(data)
    putAPI(URL, data, closeModal, handleRefresh)
  }

  const isEmpty =
    standarInput == "" ||
    codeInput == "" ||
    processInput == "" ||
    statusInput == "" ||
    codeSacInput.trim() == "" ||
    descriptionInput.trim() == "";

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Estándar</div>
        <SearchSelectView
          placeholder="Seleccione un estándar"
          select={standarInput}
          setSelectValue={setStandarInput}
          valores={standarName}
        />
        <div>Auditoría</div>
        <SearchSelectView
          placeholder="Seleccione un código de auditoría"
          select={codeInput}
          setSelectValue={setCodeInput}
          valores={codeStandarArray}
        />
        <div>Proceso</div>
        <SearchSelectView
          placeholder="Seleccione un tipo"
          select={processInput}
          setSelectValue={setProcessInput}
          valores={processName}
        />
        <div>Estado</div>
        <SearchSelectView
          placeholder="Seleccione un tipo"
          select={statusInput}
          setSelectValue={setStatusInput}
          valores={['Abierta', 'Cerrada']}
        />
        <div>Código</div>
        <input type="text"
          maxLength={195}
          className="px-2 py-1 border rounded-md bg-gray-50"
          value={codeSacInput}
          onChange={(event) => setCodeSacInput(event.target.value)} />
        <div>Descripción</div>
        <textarea
          cols="5" rows=""
          maxLength="390"
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

export default ModifySAC;
