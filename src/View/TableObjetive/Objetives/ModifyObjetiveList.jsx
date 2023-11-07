import React, { useState } from 'react';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import { Table } from '@tremor/react';
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

function ModifyObjetiveList({ closeModal, handleRefresh = () => { }, item }) {
    const [perspective, setPerspective] = useState(item.perspective)
    const [application, setApplication] = useState(item.application)
    const [objective, setObjective] = useState(item.objective)
    const [expected, setExpected] = useState(item.expected)

    const isDisable =
        perspective.trim() === "" ||
        application.trim() === "" ||
        objective.trim() === "" ||
        expected.trim() === "";

    const saveData = async () => {
        const id=item.id;
        try {
            const dataToSave = {
                newPerspective: perspective.trim(),
                newApplication: application.trim(),
                newObjective: objective.trim(),
                newExpected: expected.trim(),
                id: id
            };

            const URL = `${API_SGI360}/admin/Objetive/updateObjetive.php`;
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
            });

            const result = await response.json();

            if (result.status === 'Successfully') {
                alert("Datos guardados");
                handleRefresh();
                closeModal();
            } else {
                console.log('Error al insertar');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al intentar guardar los datos');
        }
    };

    return (
        <>
            <div>
                <div>Perspectiva</div>
                <div className=''>
                    <SearchSelectView
                        placeholder="Seleccione una perspectiva"
                        select={perspective}
                        setSelectValue={setPerspective}
                        valores={["Calidad", "Financiera", "People", "Seguridad y salud en el trabajo", "Sustentabilidad", "Business and functional performance"]}
                    />
                </div>
                <div>Aplicación</div>
                <input
                    className="w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                    type="text"
                    value={application}
                    onChange={(e) => setApplication(e.target.value)}
                />
                <div>Objetivo</div>
                <input
                    className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                    type="text"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                />
                <div>Esperado</div>
                <input
                    className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                    type="text"
                    value={expected}
                    onChange={(e) => setExpected(e.target.value)}
                />
                <div className="flex items-center justify-center w-full">
                    <button
                        disabled={isDisable}
                        onClick={saveData}
                        className={`rounded-md p-2 text-white text-sm mt-1 ${isDisable ? 'bg-slate-500' : 'bg-slate-700 mt-1'}`}
                    >
                        Guardar objetivos
                    </button>
                </div>
            </div>
        </>
    )
}

export default ModifyObjetiveList;
