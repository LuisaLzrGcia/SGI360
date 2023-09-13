import {
    Card,
    Table,
    Badge,
    Button,
} from "@tremor/react";
import InputText from "../../Component/InputText/InputText";
import { ClockIcon, ExclamationCircleIcon, StatusOnlineIcon } from "@heroicons/react/solid";
import InputDate from "../../Component/InputDate/InputDate";
import SelectView from "../../Component/Select/SelectView";

const data = [
    {
        id_document_pk: 1,
        type: "Instructivo",
        code: "IC-ALMA-RERE-01",
        title: "INSTRUCTIVO DE TRABAJO PARA RECEPCION DE SUSTANCIAS QUIMICAS, MATERIALES, EQUIPOS, REFACCIONES, MAQUINARIAS, PRODUCTOS NUEVOS Y E.P.P.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 15,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vencido",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 2,
        type: "Instructivo",
        code: "IC-ALMA-DESP-02",
        title: "INSTRUCTIVO DE TRABAJO DEL DESPACHO DE MATERIALES  Y/O EQUIPOS.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 14,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vigente",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 2,
        type: "Instructivo",
        code: "IC-ALMA-DESP-02",
        title: "INSTRUCTIVO DE TRABAJO DEL DESPACHO DE MATERIALES  Y/O EQUIPOS.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 14,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vigente",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 2,
        type: "Instructivo",
        code: "IC-ALMA-DESP-02",
        title: "INSTRUCTIVO DE TRABAJO DEL DESPACHO DE MATERIALES  Y/O EQUIPOS.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 14,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vigente",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 2,
        type: "Instructivo",
        code: "IC-ALMA-DESP-02",
        title: "INSTRUCTIVO DE TRABAJO DEL DESPACHO DE MATERIALES  Y/O EQUIPOS.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 14,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vigente",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 2,
        type: "Instructivo",
        code: "IC-ALMA-DESP-02",
        title: "INSTRUCTIVO DE TRABAJO DEL DESPACHO DE MATERIALES  Y/O EQUIPOS.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 14,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vigente",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 2,
        type: "Instructivo",
        code: "IC-ALMA-DESP-02",
        title: "INSTRUCTIVO DE TRABAJO DEL DESPACHO DE MATERIALES  Y/O EQUIPOS.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 14,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vigente",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 2,
        type: "Instructivo",
        code: "IC-ALMA-DESP-02",
        title: "INSTRUCTIVO DE TRABAJO DEL DESPACHO DE MATERIALES  Y/O EQUIPOS.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 14,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vigente",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 2,
        type: "Instructivo",
        code: "IC-ALMA-DESP-02",
        title: "INSTRUCTIVO DE TRABAJO DEL DESPACHO DE MATERIALES  Y/O EQUIPOS.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 14,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vigente",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 1,
        type: "Instructivo",
        code: "IC-ALMA-RERE-01",
        title: "INSTRUCTIVO DE TRABAJO PARA RECEPCION DE SUSTANCIAS QUIMICAS, MATERIALES, EQUIPOS, REFACCIONES, MAQUINARIAS, PRODUCTOS NUEVOS Y E.P.P.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 15,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vencido",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 2,
        type: "Instructivo",
        code: "IC-ALMA-DESP-02",
        title: "INSTRUCTIVO DE TRABAJO DEL DESPACHO DE MATERIALES  Y/O EQUIPOS.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 14,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vigente",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 2,
        type: "Instructivo",
        code: "IC-ALMA-DESP-02",
        title: "INSTRUCTIVO DE TRABAJO DEL DESPACHO DE MATERIALES  Y/O EQUIPOS.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 14,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vigente",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },
    {
        id_document_pk: 2,
        type: "Instructivo",
        code: "IC-ALMA-DESP-02",
        title: "INSTRUCTIVO DE TRABAJO DEL DESPACHO DE MATERIALES  Y/O EQUIPOS.",
        reviewer: "DGR",
        autorizer: "TCG",
        no_revision: 14,
        issuance_date: "14/06/2021",
        days: 730,
        effective_date: "14/06/2023",
        status: "Vigente",
        id_process_fk: "Almacén",
        id_subprocess_fk: "Almacén"
    },

]

const procesos = [
    "Almacén",
    "Compras",
    "Crédito y cobranza",
    "Distribución",
    "Finanzas",
    "Laboratorio Control de Calidad",
    "Logística",
    "Mantenimiento",
    "Planta de Sal",
    "Prod. Cloro e Hipoclorito",
    "Prod. Sosa -Serv. Auxiliares",
    "Proyectos y Procesos",
    "Recursos Humanos",
    "S&OP",
    "Seguridad y Medio Ambiente",
    "Sistemas de Gestión",
    "Tecnologías de la Información",
    "Ventas"
];

let encabezados = ["Código", "Título", "Reviso", "Aprobo", "No. Rev.", "Fecha de emisión", "Vigencia", "Estado", "Proceso"]
const iconPen = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

function TablesFormat() {
    return (
        <>
            <Card className="border border-red-500 overflow-auto">
                <Table className="">
                    <thead className="">
                        <tr>
                            <th className=" px-1">
                                <div>
                                    <InputText placeholder={"XX-XXXX-XX"} />
                                </div>
                            </th>
                            <th className=" px-1">
                                <div>
                                    <InputText placeholder={""} />
                                </div>
                            </th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th className="px-1">
                                <div className="">
                                    <SelectView valores={["Todas", "Vigente", "Vencido"]} />
                                </div>
                            </th>
                            <th>
                                <div className="">
                                    <SelectView valores={["Todas", ...procesos]} />
                                </div>
                            </th>
                        </tr>
                        <tr>
                            {
                                encabezados.map((item, index) => (
                                    <th className="px-2" key={index}>
                                        <div key={index} className="flex item-center justify-center">
                                            {item}
                                        </div>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {data.map((item, index) => (
                            <tr className="border-t border-slate-400" key={index}>
                                <td className="w-32">
                                    <div className="h-full w-full flex item-center justify-center">
                                        {item.code}
                                    </div>
                                </td>
                                <td className="w-80">
                                    <div className="h-full w-full flex item-center justify-center ">
                                        {item.title}
                                    </div>
                                </td>
                                <td className="">
                                    <div className="h-full w-full flex item-center justify-center ">
                                        {item.reviewer}
                                    </div>
                                </td>
                                <td className="">
                                    <div className="h-full w-full flex item-center justify-center ">
                                        {item.autorizer}
                                    </div>
                                </td>
                                <td className="">
                                    <div className="h-full w-full flex item-center justify-center ">
                                        {item.no_revision}
                                    </div>
                                </td>
                                <td className="">
                                    <div className="h-full w-full flex item-center justify-center ">
                                        {item.issuance_date}
                                    </div>
                                </td>
                                <td className="">
                                    <div className="h-full w-full flex item-center justify-center ">
                                        {item.effective_date}
                                    </div>
                                </td>
                                <td className="">
                                    <div className="h-full w-full flex item-center justify-center ">
                                        {
                                            item.status == "Vencido"
                                                ?
                                                <Badge color="red" size="xs" icon={ExclamationCircleIcon}>{item.status}</Badge>
                                                :
                                                <Badge color="emerald" size="xs" icon={StatusOnlineIcon}>{item.status}</Badge>
                                        }
                                    </div>
                                </td>
                                <td className="">
                                    <div className="h-full w-full flex item-center justify-center ">
                                        {item.id_process_fk}
                                    </div>
                                </td>
                                <td className="">
                                    <div className="h-full w-full flex item-center justify-center ">
                                        <Button className="p-1 m-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </Button>
                                        <Button color="emerald" className="p-1 m-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

export default TablesFormat