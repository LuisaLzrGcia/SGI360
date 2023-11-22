import React, { useContext, useEffect, useState } from "react";
import SelectView from "../../../Component/Select/SelectView";
import AlertView from "../../../Component/Alert/AlertView";
import getData from "../../../Hooks/getData";
import { SGIContext } from "../../../Context/SGIContext";
import SearchSelectView from "../../../Component/SearchSelect/SearchSelectView";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;


function NewUser({ arrayProcesses, setDataUsers = "", dataUsers, closeModal, handleRefresh }) {
  const processName = arrayProcesses.map(item => item.name);
  processName.sort((a, b) => a.localeCompare(b));
  const [usernameInput, setUsernameInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [processInput, setProcessInput] = useState("");
  const [jobTitleInput, setJobTitleInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [typeUserInput, setTypeUserInput] = useState("Manager");
  const [samePassword, setSamePassword] = useState(true)


  function saveData() {
    const processFind = arrayProcesses.find(item => item.name === processInput)
    const URL = `${API_SGI360_NODEJS}/user`;
    const data = {
      newUsername: usernameInput.trim(),
      newFirstName: firstNameInput.trim(),
      newLastName: lastNameInput.trim(),
      newPassword: passwordInput.trim(),
      newJobTitle: jobTitleInput.trim(),
      newTypeUser: typeUserInput.trim(),
      newIdProcess: parseInt(processFind.id_process_pk),
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

  useEffect(() => {
    if (passwordInput == confirmPasswordInput) {
      setSamePassword(true)
    } else {
      setSamePassword(false)
    }
  }, [passwordInput, confirmPasswordInput])

  const isAnyFieldEmpty =
    usernameInput.trim() === "" ||
    firstNameInput.trim() === "" ||
    lastNameInput.trim() === "" ||
    jobTitleInput.trim() === "" ||
    passwordInput.trim() === "" ||
    confirmPasswordInput.trim() === "" ||
    processInput.trim() === "";

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Nombre de usuario</div>
        <input type="text"
          value={usernameInput}
          onChange={(event) => setUsernameInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Nombre</div>
        <input
          value={firstNameInput}
          onChange={(event) => setFirstNameInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Apellido</div>
        <input
          value={lastNameInput}
          onChange={(event) => setLastNameInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Tipo de usuario</div>
        <SelectView
          select={typeUserInput}
          selectValue={setTypeUserInput}
          onChange={(event) => setTypeUserInput(event.target.value)}
          valores={["Admin", "Manager"]} />
        <div>Proceso</div>
        <SearchSelectView
          placeholder="Seleccione un proceso"
          select={processInput}
          setSelectValue={setProcessInput}
          valores={processName}
        />
        <div>Puesto</div>
        <input
          value={jobTitleInput}
          onChange={(event) => setJobTitleInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Contraseña</div>
        <input
          value={passwordInput}
          onChangeCapture={() => setSamePassword(false)}
          onChange={(event) => setPasswordInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Confirmar contraseña</div>
        <input
          value={confirmPasswordInput}
          onChangeCapture={() => setSamePassword(false)}
          onChange={(event) => setConfirmPasswordInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        {
          samePassword ? (
            null
          ) : (
            <AlertView className={"py-1"} type={"Error"} message={"Las contraseñas no son iguales"} />
          )
        }
        <button
          onClick={saveData}
          className={`rounded-md p-2 text-white text-sm ${!samePassword ? 'bg-slate-500' : isAnyFieldEmpty ? 'bg-slate-500' : 'bg-slate-700 mt-1'
            }`}
          disabled={!samePassword || isAnyFieldEmpty}
        >
          Guardar datos
        </button>
      </div>
    </>
  )
};

export default NewUser;