import React from "react";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;


const DeleteUser = ({ data = "", setDataUsers, closeModal }) => {

  const handleDelete = async (id) => {
    const URL = `${API_SGI360_NODEJS}/user/${id}`;
    fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'Successfully') {
          alert("Datos borrados");
          setDataUsers()
          closeModal();
        } else {
          console.log('Error al insertar');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al intentar guardar los datos');
      })
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
          value={data.user_name}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Nombre</div>
        <input
          value={data.first_name}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Apellido</div>
        <input
          value={data.last_name}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Tipo de usuario</div>
        <input
          value={data.type}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50 capitalize" />
        <div>Puesto</div>
        <input
          value={data.job_title}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50 capitalize" />
        <div>Proceso</div>
        <input
          value={data.process_name}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50 capitalize" />
        <div>Contraseña</div>
        <input
          value={data.password}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <button
          onClick={() => handleDelete(data.id_user_pk)}
          className={`rounded-md p-2 text-white text-sm bg-slate-700 mt-2`}
        >
          Eliminar usuario
        </button>
      </div>
    </>
  )
};

export default DeleteUser;