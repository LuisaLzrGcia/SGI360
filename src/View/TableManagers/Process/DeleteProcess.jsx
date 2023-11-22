import React from "react";
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

const DeleteProcess = ({ data = "", updateData, closeModal }) => {
  const { id_process_pk, name, abbreviation } = data;

  const handleDelete = async () => {
    const URL = `${API_SGI360_NODEJS}/process/${id_process_pk}`;
    console.log(URL)
    fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === 'Successfully') {
          alert("Datos eliminados");
          updateData()
          closeModal();
        } else {
          console.log('Error al insertar');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al intentar eliminar los datos');
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <h1 className="font-bold text-center my-1">
          ¿Esta seguro de eliminar este proceso?
        </h1>
        <div>Nombre del proceso</div>
        <input type="text"
          value={name}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <div>Abreviación</div>
        <input
          value={abbreviation}
          disabled={true}
          className="px-2 py-1 border rounded-md bg-gray-50" />
        <button
          onClick={() => handleDelete()}
          className={`rounded-md p-2 text-white text-sm bg-slate-700 mt-2`}
        >
          Eliminar proceso
        </button>
      </div>
    </>
  )
};

export default DeleteProcess;