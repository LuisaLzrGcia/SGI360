import React, { useEffect, useState } from "react";
import SelectView from "../../Component/Select/SelectView";
import AlertView from "../../Component/Alert/AlertView";
import getData from "../../Hooks/getData";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

function NewUser({setDataUsers, closeModal}) {
  const [isLoading, setIsLoading] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [typeUserInput, setTypeUserInput] = useState("manager");
  const [samePassword, setSamePassword] = useState(true)

  const saveData = async () => {
    console.log("first")
    const saveUser = await getData(
      `${API_SGI360}/admin/insertUser.php?newUsername=${encodeURIComponent(usernameInput)}&newPassword=${encodeURIComponent(passwordInput)}&newFirstName=${encodeURIComponent(firstNameInput)}&newLastName=${encodeURIComponent(lastNameInput)}&newTypeUser=${typeUserInput == 'admin' ? 1 : 2}`
    );
    console.log(saveUser)
    if (saveUser == 'Successfully') {
      console.log("second")
      setDataUsers(await getData(`${API_SGI360}/admin/allUsers.php`))
      console.log("second")
      alert("Datos guardados");
      closeModal();
    } else {
      alert("Error al intentar guardar los datos");
    }
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
      <div class="grid grid-cols-1 mt-3">
        <div>Nombre de usuario</div>
        <input type="text"
          value={usernameInput}
          onChange={(event) => setUsernameInput(event.target.value)}
          class="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Nombre</div>
        <input
          value={firstNameInput}
          onChange={(event) => setFirstNameInput(event.target.value)}
          class="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Apellido</div>
        <input
          value={lastNameInput}
          onChange={(event) => setLastNameInput(event.target.value)}
          class="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Tipo de usuario</div>
        <SelectView
          select={typeUserInput}
          selectValue={setTypeUserInput}
          onChange={(event) => setTypeUserInput(event.target.value)}
          valores={["admin", "manager"]} />
        <div>Contraseña</div>
        <input
          value={passwordInput}
          onChangeCapture={() => setSamePassword(false)}
          onChange={(event) => setPasswordInput(event.target.value)}
          class="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Confirmar contraseña</div>
        <input
          value={confirmPasswordInput}
          onChangeCapture={() => setSamePassword(false)}
          onChange={(event) => setConfirmPasswordInput(event.target.value)}
          class="px-2 py-1 border rounded-md bg-gray-50" />
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

export default NewUser;