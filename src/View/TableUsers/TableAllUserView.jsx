import {
    Table,
} from "@tremor/react";
import { useState } from "react";
import React from "react";
import ModalView from "../../Component/Modal/ModalView";
import ModifyUser from "./ModifyUser";
import NewUser from "./NewUser";
import getData from "../../Hooks/getData";
const API_SGI360 = import.meta.env.VITE_API_DATABASE;
const allUser = await getData(`${API_SGI360}/admin/allUsers.php`)
function TableAllUserView() {
    const [dataUsers, setDataUsers] = useState(allUser)

    const [isOpen, setIsOpen] = useState(false);
    const [componet, setComponet] = useState("")
    const [action, setAction] = useState("new")
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const handleNew = () => {
        setAction('new')
        const newUserComponent = <NewUser setDataUsers={setDataUsers} closeModal={closeModal} />;
        setComponet(newUserComponent)
        openModal();
    }
    const handleModify = ({ item }) => {
        setAction('modify')
        const updateUserComponent = <ModifyUser data={item} setDataUsers={setDataUsers} closeModal={closeModal} />;
        setComponet(updateUserComponent)
        openModal();
    }
    const handleRefresh = async () => {
        setDataUsers(await getData(`${API_SGI360}/admin/allUsers.php`))
    }

    return (
        <>
            {
                action == 'new' ?
                    <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Registrar nuevo usuario"} />
                    :
                    <ModalView openModal={openModal} closeModal={closeModal} isOpen={isOpen} componentReact={componet} title={"Modificar usuario"} />
            }


            <div className="pb-5 flex items-center justify-between">
                <button onClick={handleNew} className="rounded-md bg-slate-700 p-2 text-white text-sm">
                    Añadir usuario
                </button>
                <button onClick={handleRefresh} className="ml-3 rounded-md bg-slate-700 p-2 text-white text-sm flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                </button>
            </div>
            <Table>
                <thead className="text-black">
                    <tr>
                        <th>
                            <div className="flex item-center justify-center">
                                Nombre de usuario
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Nombre completo
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Contraseña
                            </div>
                        </th>
                        <th>
                            <div className="flex item-center justify-center">
                                Tipo de usuario
                            </div>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="text-md text-black">
                    {dataUsers.map((item, index) => (
                        <tr className="border-t border-slate-400" key={index}>
                            <td className="">
                                <div className="flex item-center justify-center">
                                    {item.username}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center ">
                                    {item.firstName + " " + item.lastName}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center ">
                                    {item.password}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center capitalize">
                                    {item.typeUser}
                                </div>
                            </td>
                            <td className="">
                                <div className="flex item-center justify-center capitalize">
                                    <button onClick={() => handleModify({ item })} className="p-1 m-1 bg-slate-700 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </button>

                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default TableAllUserView