import React, { useEffect, useState } from 'react';
import SearchSelectView from '../../../Component/SearchSelect/SearchSelectView';
import putAPI from '../../../Hooks/putAPI';
import fetchDataPerspective from '../../../utils/fetchDataPerspective';
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

function ModifyObjetiveList({ closeModal, handleRefresh = () => { }, item }) {
    const [perspective, setPerspective] = useState(item.perspective)
    const [application, setApplication] = useState(item.application)
    const [objective, setObjective] = useState(item.objective)
    const [measurement, setMeasurement] = useState(item.measurement)
    const [consult, setConsult] = useState(item.consult)
    const [initialValue, setInitialValue] = useState(item.initialValue)
    const [finalValue, setFinalValue] = useState(item.finalValue)
    const [date, setDate] = useState(item.date)
    const [frequency, setFrequency] = useState(item.frequency)
    const [who, setWho] = useState(item.who)
    const [communicate, setCommunicate] = useState(item.communicate)
    const [expected, setExpected] = useState(item.expected)

    const [perspectiveData, setPerspectiveData] = useState([]);

    const isDisable =
        perspective.trim() === "" ||
        application.trim() === "" ||
        objective.trim() === "" ||
        expected.trim() === "";

    const saveData = async () => {
        const id = item.id_objetive_pk;
        try {
            const dataToSave = {
                newPerspective: perspective,
                newApplication: application.trim(),
                newObjective: objective.trim(),
                measurement: measurement.trim(),
                consult: consult.trim(),
                initialValue: initialValue.trim(),
                finalValue: finalValue.trim(),
                date: date.trim(),
                frequency: frequency.trim(),
                who: who.trim(),
                communicate: communicate.trim(),
                newExpected: expected.trim(),
                idObjetive: id
            };
            console.log(dataToSave)
            const URL = `${API_SGI360_NODEJS}/objective`;
            putAPI(URL, dataToSave, closeModal, handleRefresh)
        } catch (error) {
            console.error('Error:', error);
            alert('Error al intentar guardar los datos');
        }
    };

    const getPerspective = async () => {
        try {
            const data = await fetchDataPerspective()
            setPerspectiveData(data)
        } catch (err) {
            console.log("Error ", err)
        }
    }

    useEffect(() => {
        getPerspective()
    }, [])


    return (
        <>
            <div className='grid grid-cols-2 gap-x-2'>
                <div>
                    <div>Perspectiva</div>
                    <div className=''>
                        <SearchSelectView
                            placeholder="Seleccione una perspectiva"
                            select={perspective}
                            setSelectValue={setPerspective}
                            valores={perspectiveData}
                        />
                    </div>
                </div>
                <div>
                    <div>Aplicación</div>
                    <textarea
                        className="w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                        type="text"
                        value={application}
                        onChange={(e) => setApplication(e.target.value)}
                        name="" id="" cols="31" rows="1"
                    ></textarea>
                </div>
                <div>
                    <div>Objetivo</div>
                    <textarea
                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                        type="text"
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                        name="" id="" cols="31" rows="1"></textarea>
                </div>
                <div>
                    <div>Unidad de medida</div>
                    <textarea
                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                        type="text"
                        value={measurement}
                        onChange={(e) => setMeasurement(e.target.value)}
                        name="" id="" cols="31" rows="1"></textarea>
                </div>
                <div>
                    <div>Consulta</div>
                    <textarea
                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                        type="text"
                        value={consult}
                        onChange={(e) => setConsult(e.target.value)}
                        name="" id="" cols="31" rows="1"></textarea>
                </div>
                <div>
                    <div>Valor inicial</div>
                    <textarea
                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                        type="text"
                        value={initialValue}
                        onChange={(e) => setInitialValue(e.target.value)}
                        name="" id="" cols="31" rows="1"></textarea>
                </div>
                <div>
                    <div>Valor esperado</div>
                    <textarea
                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                        type="text"
                        value={finalValue}
                        onChange={(e) => setFinalValue(e.target.value)}
                        name="" id="" cols="31" rows="1"></textarea>
                </div>
                <div>
                    <div>Fecha</div>
                    <textarea
                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        name="" id="" cols="31" rows="1"></textarea>
                </div>
                <div>
                    <div>Frecuencia</div>
                    <textarea
                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                        type="text"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        name="" id="" cols="31" rows="1"></textarea>
                </div>
                <div>
                    <div>Quien</div>
                    <textarea
                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                        type="text"
                        value={who}
                        onChange={(e) => setWho(e.target.value)}
                        name="" id="" cols="31" rows="1"></textarea>
                </div>
                <div>
                    <div>Comunicar</div>
                    <textarea
                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                        type="text"
                        value={communicate}
                        onChange={(e) => setCommunicate(e.target.value)}
                        name="" id="" cols="31" rows="1"></textarea>
                </div>
                <div>
                    <div>Esperado</div>
                    <input
                        className=" w-full px-2 py-1 border rounded-md bg-gray-50 m-1"
                        type="text"
                        value={expected}
                        onChange={(e) => setExpected(e.target.value)}
                    />
                </div>
                <div className='col-span-2'>
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
            </div>
        </>
    )
}

export default ModifyObjetiveList;
