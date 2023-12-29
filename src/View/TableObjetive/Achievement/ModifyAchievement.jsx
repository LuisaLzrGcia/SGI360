import React, { useState } from 'react';
import putAPI from '../../../Hooks/putAPI';
import { Tooltip } from '@mui/material';
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

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
        const id = item.id_objetive_pk;
        try {
            const dataToSave = {
                newCurrent: current.trim(),
                newAchievement: parseFloat(achievement.trim()),
                idObjetive: id
            };
            const URL = `${API_SGI360_NODEJS}/objective/achievement`;
            putAPI(URL, dataToSave, closeModal, handleRefresh)
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
                    className="w-full px-2 py-1 border rounded-md bg-gray-200 m-1 select-none"
                    type="text"
                    disabled={true}
                    title={perspective}
                >
                    {perspective}
                </div>
                <div>Aplicación</div>
                <div
                    className="w-full px-2 py-1 border rounded-md bg-gray-200 m-1 select-none"
                    type="text"
                    disabled={true}
                    title={application}
                >
                    {application}
                </div>
                <div>Objetivo</div>
                <div
                    className="w-full px-2 py-1 border rounded-md bg-gray-200 m-1 select-none"
                    type="text"
                    disabled={true}
                    title={objective}
                >
                    {objective}
                </div>
                <div>Esperado</div>
                <div
                    className="w-full px-2 py-1 border rounded-md bg-gray-200 m-1 select-none"
                    type="text"
                    disabled={true}
                    title={expected}
                >
                    {expected}
                </div>
                <div>Actual</div>
                <input
                    maxLength={35}
                    className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                    type="text"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                />
                <div className='flex'>
                    <div>
                        Cumplimiento
                    </div>
                    <div >
                        <Tooltip title="0% es no cumplio, 100% es cumplio" aria-label="add">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                        </Tooltip>
                    </div>
                </div>
                <div className='w-full px-2 py-1 border rounded-md bg-gray-50 m-1 flex justify-between'>
                    <input
                        maxLength={8}
                        className="bg-transparent hover:bg-transparent"
                        type="number"
                        value={achievement}
                        onChange={(e) => setAchievement(e.target.value)}
                    />
                    <span className='font-semibold'>%</span>
                </div>
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
