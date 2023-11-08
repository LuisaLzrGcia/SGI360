import React, { useContext, useEffect, useState } from "react";
import { SGIContext } from "../../../Context/SGIContext";
import getData from "../../../Hooks/getData";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

const DeleteUser = ({ data = "", setDataUsers, closeModal }) => {
  const { deleteDataUser } = useContext(SGIContext);
  const { id, username, firstName, lastName, password, process, jobTitle, type } = data;

  const handleDelete = async (id) => {
    const statusDelete = await deleteDataUser(id);
    console.log(statusDelete)
    if (statusDelete == 'Successfully') {
      setDataUsers(await getData(`${API_SGI360}/admin/allUsers.php`))
      closeModal();
    } else {
      alert("Error al intentar eliminar usuario");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <h1 className="font-bold text-center my-1">
          ¿Esta seguro de eliminar este usuario?
        </h1>
        <div>Nombre de usuario</div>
        <input type="text"
          disabled={true}
          value={username}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Nombre</div>
        <input
          value={firstName}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Apellido</div>
        <input
          value={lastName}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Tipo de usuario</div>
        <input
          value={type}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50 capitalize" />
        <div>Puesto</div>
        <input
          value={jobTitle}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50 capitalize" />
        <div>Proceso</div>
        <input
          value={process}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50 capitalize" />
        <div>Contraseña</div>
        <input
          value={password}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <button
          onClick={() => handleDelete(id)}
          className={`rounded-md p-2 text-white text-sm bg-slate-700 mt-2`}
        >
          Eliminar usuario
        </button>
      </div>
    </>
  )
};

export default DeleteUser;