import React, { useState } from 'react';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import { Table } from '@tremor/react';
const API_SGI360 = import.meta.env.VITE_API_DATABASE;

function ModifyAchievement({ closeModal, handleRefresh = () => { }, item }) {
    const [perspective, setPerspective] = useState(item.perspective)
    const [application, setApplication] = useState(item.application)
    const [objective, setObjective] = useState(item.objective)
    const [expected, setExpected] = useState(item.expected)
    const [current, setCurrent] = useState(item.current)
    const [achievement, setAchievement] = useState(item.achievement)

    const isDisable =
        perspective.trim() === "" ||
        application.trim() === "" ||
        objective.trim() === "" ||
        expected.trim() === "";

    const saveData = async () => {
        const id = item.id;
        try {
            const dataToSave = {
                newCurrent: current.trim(),
                newAchievement: parseInt(achievement.trim()),
                id: id
            };
            console.log(dataToSave)
            const URL = `${API_SGI360}/admin/Objetive/updateOneObjective.php`;
            console.log(URL)
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
                <div
                    className="w-full px-2 py-1 border rounded-md bg-gray-50 m-1 select-none"
                    type="text"
                    title={perspective}
                >
                    {perspective}
                </div>
                <div>Aplicación</div>
                <div
                    className="w-full px-2 py-1 border rounded-md bg-gray-50 m-1 select-none"
                    type="text"
                    title={application}
                >
                    {application}
                </div>
                <div>Objetivo</div>
                <div
                    className="w-full px-2 py-1 border rounded-md bg-gray-50 m-1 select-none"
                    type="text"
                    title={objective}
                >
                    {objective}
                </div>
                <div>Esperado</div>
                <div
                    className="w-full px-2 py-1 border rounded-md bg-gray-50 m-1 select-none"
                    type="text"
                    title={expected}
                >
                    {expected}
                </div>
                <div>Actual</div>
                <input
                    className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                    type="text"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                />
                <div>Cumplimiento</div>
                <input
                    className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                    type="text"
                    value={achievement}
                    onChange={(e) => setAchievement(e.target.value)}
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
            </div >
        </>
    )
}

export default ModifyAchievement;
