import React, { useContext, useEffect, useState } from "react";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

function DeleteAudit({ item, handleRefresh = () => { }, closeModal }) {
  const [codeInput, setCodeInput] = useState(item.audit_code);
  const [standarInput, setStandarInput] = useState(item.standar_name);
  const [descriptionInput, setDescriptionInput] = useState(item.audit_description);
  const [startDateInput, setStartDateInput] = useState(item.dateStartFormat);
  const [finishDateInput, setFinishDateInput] = useState(item.dateFinishFormat);

  const [typeInput, setTypeInput] = useState(item.audit_type);
  const [statusInput, setStatusInput] = useState(item.audit_status)

  function saveData() {
    const URL = `${API_SGI360}/admin/audit/deleteAudit.php`;
    const data = {
      id: item.id_audit_pk
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
          alert("Datos eliminados");
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
    codeInput.trim() == "" ||
    startDateInput == "" ||
    finishDateInput == "" ||
    standarInput.trim() == "" ||
    typeInput == "" ||
    descriptionInput.trim() == "";

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Fecha de inicio</div>
        <input
          type="text"
          disabled={true}
          value={startDateInput}
          onChange={(event) => startDateInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Fecha de cierre</div>
        <input
          type="text"
          disabled={true}
          value={finishDateInput}
          onChange={(event) => setFinishDateInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Tipo</div>
        <input
          type="text"
          disabled={true}
          value={typeInput}
          onChange={(event) => setTypeInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Estado</div>
        <input
          type="text"
          disabled={true}
          value={statusInput}
          onChange={(event) => setStatusInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Código</div>
        <input
          type="text"
          disabled={true}
          value={codeInput}
          onChange={(event) => setCodeInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Estándar</div>
        <input
          type="text"
          disabled={true}
          value={standarInput}
          onChange={(event) => setStandarInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        />
        <div>Descripción</div>
        <textarea
          cols="5" rows=""
          disabled={true}
          value={descriptionInput}
          onChange={(event) => setStandarInput(event.target.value)}
          className="px-2 py-1 border rounded-md bg-gray-50"
        ></textarea>
        <button
          onClick={saveData}
          disabled={isEmpty}
          className={`rounded-md p-2 text-white text-sm mt-1 ${isEmpty ? 'bg-slate-500' : 'bg-slate-700'}
            `}
        >
          Eliminar datos
        </button>
      </div >
    </>
  );
}

export default DeleteAudit;
