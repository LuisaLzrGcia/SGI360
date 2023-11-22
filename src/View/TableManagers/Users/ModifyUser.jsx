import React, { useEffect, useState } from "react";
import SelectView from "../../../Component/Select/SelectView";
import AlertView from "../../../Component/Alert/AlertView";
import SearchSelectView from "../../../Component/SearchSelect/SearchSelectView";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;


const ModifyUser = ({ arrayProcesses, data = "", setDataUsers, closeModal, handleRefresh = () => { } }) => {
  const processName = arrayProcesses.map(item => item.name);
  processName.sort((a, b) => a.localeCompare(b));
  const confirmPassword = data.password;
  const [usernameInput, setUsernameInput] = useState(data.user_name);
  const [firstNameInput, setFirstNameInput] = useState(data.first_name);
  const [jobTitleInput, setJobTitleInput] = useState(data.job_title);
  const [processInput, setProcessInput] = useState(data.process_name);
  const [lastNameInput, setLastNameInput] = useState(data.last_name);
  const [passwordInput, setPasswordInput] = useState(data.password);
  const [confirmPasswordInput, setConfirmPasswordInput] = useState(confirmPassword);
  const [typeUserInput, setTypeUserInput] = useState(data.type);
  const [samePassword, setSamePassword] = useState(true)

  const saveData = async () => {
    const processFind = arrayProcesses.find(item => item.name === processInput)
    const dataToSave = {
      userId: parseInt(data.id_user_pk),
      newUsername: usernameInput,
      newPassword: passwordInput,
      newFirstName: firstNameInput,
      newLastName: lastNameInput,
      newTypeUser: typeUserInput,
      newJobTitle: jobTitleInput,
      newIdProcess: parseInt(processFind.id_process_pk)
    };

    const URL = `${API_SGI360_NODEJS}/user`;
    console.log(URL)
    fetch(URL, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(dataToSave)
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
        alert('Error al intentar guardar los datos');
      })

  };

  useEffect(() => {
    if (passwordInput == confirmPasswordInput) {
      setSamePassword(true)
    } else {
      setSamePassword(false)
    }
  }, [passwordInput, confirmPasswordInput])


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
          className={`rounded-md p-2 text-white text-sm  ${!samePassword ? 'bg-slate-500' : 'bg-slate-700 mt-1'
            }`}
          disabled={!samePassword}
        >
          Guardar datos
        </button>
      </div>
    </>
  )
};

export default ModifyUser;