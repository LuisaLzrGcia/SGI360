import React, { useContext, useEffect, useState } from "react";
import SearchSelectView from "../../../Component/SearchSelect/SearchSelectView";
import postAPI from '../../../Hooks/postAPI';
const API_SGI360_NODEJS = import.meta.env.VITE_API_SGI360_DATABASE;

function NewAC({ handleRefresh = () => { }, closeModal, standarArray, getCodes, fetchACCode }) {
  const namesStandar = standarArray.map(item => item.name);
  const [standarName, setStandarName] = useState(namesStandar)
  const [standarInput, setStandarInput] = useState("");

  const [codeArray, setcodeArray] = useState([])
  const [codeStandarArray, setCodeStandarArray] = useState([])
  const [codeInput, setCodeInput] = useState("");
  const [codeAudit, setCodeAudit] = useState([])

  const [processInput, setProcessInput] = useState("")
  const [statusInput, setStatusInput] = useState("Abierta")

  const [codeSacInput, setCodeSacInput] = useState("");

  const [actionCorrectiveList, setActionCorrectiveList] = useState([{ id: 1, AC: "AC1", description: "", responsible: "", status: "Abierta" }]);

  const arrayYears = Array.from({ length: 27 }, (_, index) => (2023 + index).toString());
  const currentDate = new Date();
  const currentYearFind = currentDate.getFullYear().toString();
  const [yearInput, setYearInput] = useState(currentYearFind)

  const [sacArray, setSacArray] = useState([])
  const [sacInput, setSacInput] = useState("")
  const [sacDataInput, setSacDataInput] = useState([])

  function saveData() {
    const URL = `${API_SGI360_NODEJS}/ac`;
    const sacArray = sacDataInput.filter(item => item.sac_code === sacInput)
    const idSacInput = sacArray.map(item => item.id_sac_pk)[0]
    const data = actionCorrectiveList.map(item => {
      return { ...item, idSac: idSacInput };
    });
    postAPI(URL, data, closeModal, handleRefresh);
  }

  const isEmpty =
    standarInput === "" ||
    codeInput === "" ||
    sacInput === "" ||
    yearInput === "" ||
    !validateActionCorrectiveList(actionCorrectiveList);

  const addActionCorrective = () => {
    const newAC = {
      id: actionCorrectiveList.length + 1,
      AC: `AC${actionCorrectiveList.length + 1}`,
      description: "",
      responsible: "",
      status: "Abierta"
    };
    setActionCorrectiveList([...actionCorrectiveList, newAC]);
  };

  const removeActionCorrective = (id) => {
    const updatedList = actionCorrectiveList.filter((ac) => ac.id !== id);
    const reindexedACList = updatedList.map((ac, index) => ({
      ...ac,
      id: index + 1,
      AC: `AC${index + 1}`
    }));

    setActionCorrectiveList(reindexedACList);
  };

  const handleACChange = (id, field, value) => {
    const updatedList = actionCorrectiveList.map((ac) => {
      if (ac.id === id) {
        return { ...ac, [field]: value };
      }
      return ac;
    });
    setActionCorrectiveList(updatedList);
  };

  function validateActionCorrectiveList(actionCorrectiveList) {
    for (const ac of actionCorrectiveList) {
      if (Object.values(ac).some(value => value == null || value === "")) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (standarInput !== '' && yearInput !== '') {
        try {
          const dataSAC = await getCodes(standarInput, yearInput);
          const codes = dataSAC.map(item => item.audit_code);
          setCodeAudit(codes);
          if (codeInput !== '') {
            const code = await fetchACCode(codeInput);
            const sacCodes = code.map(item => item.sac_code);
            setSacDataInput(code);
            setSacArray(sacCodes)
          } else {
            setSacArray([])
          }
        } catch (error) {
          console.error("Error al obtener los códigos:", error);
        }
      } else {
        setCodeAudit([])
      }
    };

    fetchData();
  }, [standarInput, yearInput, codeInput, sacInput]);

  return (
    <>
      <div className="grid grid-cols-1 mt-3">
        <div>Estándar</div>
        <SearchSelectView
          placeholder="Seleccione un estándar"
          select={standarInput}
          setSelectValue={setStandarInput}
          valores={standarName}
        />
        <div>Año</div>
        <SearchSelectView
          placeholder="Seleccione un año"
          select={yearInput}
          setSelectValue={setYearInput}
          valores={arrayYears}
        />
        <div>Auditoría</div>
        <SearchSelectView
          placeholder="Seleccione una auditoría"
          select={codeInput}
          setSelectValue={setCodeInput}
          valores={codeAudit}
        />
        <div>SAC</div>
        <SearchSelectView
          placeholder="Seleccione una SAC"
          select={sacInput}
          setSelectValue={setSacInput}
          valores={sacArray}
        />
        <div className="mt-1">
          <div className="flex justify-between">
            <div>Acciones Correctivas</div>
            <button
              className={`rounded-md p-2 text-white text-sm mt-1 bg-slate-700`}
              onClick={addActionCorrective}>
              Agregar AC
            </button>
          </div>

          <table className="table-auto">
            <thead>
              <tr>
                <th className="text-center">#AC</th>
                <th className="text-center">Descripción</th>
                <th className="text-center">Responsable</th>
                <th className="text-center">Estado</th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {actionCorrectiveList.map((ac) => (
                <tr key={ac.id}>
                  <td>{ac.AC}</td>
                  <td className="p-2">
                    <textarea name="" id="" cols="" rows="1"
                      maxLength="390"
                      className="px-2 py-1 border rounded-md bg-gray-50"
                      value={ac.description} onChange={(e) => handleACChange(ac.id, "description", e.target.value)} ></textarea>
                  </td>
                  <td className="p-2">
                    <input type="text"
                      maxLength="190"
                      className="px-2 py-1 border rounded-md bg-gray-50"
                      value={ac.responsible} onChange={(e) => handleACChange(ac.id, "responsible", e.target.value)} />
                  </td>
                  <td className="p-2">
                    <select
                      className="px-2 py-1 border rounded-md bg-gray-50"
                      value={ac.status} onChange={(e) => handleACChange(ac.id, "status", e.target.value)}>
                      <option value="Abierta">Abierta</option>
                      <option value="Cerrada">Cerrada</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="rounded-md bg-slate-700 p-1 m-1 text-white text-sm"
                      onClick={() => removeActionCorrective(ac.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={saveData}
          disabled={isEmpty}
          className={`rounded-md p-2 text-white text-sm mt-1 ${isEmpty ? 'bg-slate-500' : 'bg-slate-700'}`}
        >
          Guardar datos
        </button>
      </div>


    </>
  );
}

export default NewAC;
