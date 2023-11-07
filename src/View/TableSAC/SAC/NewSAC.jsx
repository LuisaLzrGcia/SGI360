import React, { useContext, useEffect, useState } from "react";
import SearchSelectView from "../../../Component/SearchSelect/SearchSelectView";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

function NewSAC({ handleRefresh = () => { }, closeModal, standarArray, getCodes, processArray, processName }) {
  const namesStandar = standarArray.map(item => item.name);
  const [standarName, setStandarName] = useState(namesStandar)
  const [standarInput, setStandarInput] = useState("");

  const [codeArray, setcodeArray] = useState([])
  const [codeStandarArray, setCodeStandarArray] = useState([])
  const [codeInput, setCodeInput] = useState("");

  const [processInput, setProcessInput] = useState("")
  const [statusInput, setStatusInput] = useState("Abierta")

  const [descriptionInput, setDescriptionInput] = useState("");

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
    const codeFind = codeArray.find(item => item.audit_code === codeInput)
    const processFind = processArray.find(item => item.name === processInput)
    const URL = `${API_SGI360}/admin/SAC/insertSAC.php`;
    console.log(URL)
    const data = {
      code: parseInt(codeFind.id_audit_pk),
      description: descriptionInput.trim(),
      status: statusInput,
      process: parseInt(processFind.id),
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
    standarInput == "" ||
    codeInput == "" ||
    processInput == "" ||
    statusInput == "" ||
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

export default NewSAC;
