import React from 'react'
import {
    ProgressBar,
    Card,
    Flex,
    Text,
    TabList,
    Tab,
    TabGroup,
    TabPanels,
    TabPanel,
    Title,
} from "@tremor/react";
import { UserGroupIcon, UserIcon } from "@heroicons/react/solid";
import Objetivos from "./Objetivos/Objetivos";
import CtrlDocumental from "./CtrlDocumental/CtrlDocumental";
import AccionesCorrec from "./Acciones Correctivas/AccionesCorrec";
import BarChartExample from "./BarChartExample";
import BarChartView from "../../Charts/BarChartView";



function DashboardGralView() {
    const chartdata = [
        {
            nameX: "SGI",
            name: "Sistemas de Gestión",
            "Desempeño": 91,
        },
        {
            nameX: "SyMA",
            name: "Seguridad y Medio Ambiente",
            "Desempeño": 92,
        },
        {
            nameX: "Logística",
            name: "Logística",
            "Desempeño": 79,
        },
        {
            nameX: "S&OP",
            name: "S&OP",
            "Desempeño": 79,
        },
        {
            nameX: "C&C",
            name: "Crédito y cobranza",
            "Desempeño": 79,
        },
        {
            nameX: "Ventas",
            name: "Ventas",
            "Desempeño": 79,
        },
        {
            nameX: "Laboratorio",
            name: "Laboratorio Control de Calidad",
            "Desempeño": 96,
        },
        {
            nameX: "Cloro",
            name: "Prod. Cloro e Hipoclorito",
            "Desempeño": 73,
        },
        {
            nameX: "Sosa",
            name: "Prod. Sosa -Serv. Auxiliares",
            "Desempeño": 97,
        },
        {
            nameX: "Sal",
            name: "Planta de Sal",
            "Desempeño": 98,
        },
        {
            nameX: "Distr.",
            name: "Distribución",
            "Desempeño": 76
        },
        {
            nameX: "Finanzas",
            name: "Finanzas",
            "Desempeño": 98
        },
        {
            nameX: "Almacén",
            name: "Almacén",
            "Desempeño": 84
        },
        {
            nameX: "Compras",
            name: "Compras",
            "Desempeño": 78
        },
        {
            nameX: "Mtto.",
            name: "Mantenimiento",
            "Desempeño": 68
        },
        {
            nameX: "TI",
            name: "Tecnologías de la Información",
            "Desempeño": 67
        },
        {
            nameX: "P&P",
            name: "Proyectos y Procesos",
            "Desempeño": 97
        },
        {
            nameX: "RRHH",
            name: "Recursos Humanos",
            "Desempeño": 91
        }
    ];

    return (
        <>
            <div className="mx-1 mb-5">
                <div className="grid grid-cols-2 gap-5 mx-5">
                <iframe title="Control documental" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=9c472e76-732a-401a-8366-0bee2a752a7e&autoAuth=true&ctid=fad75a54-a323-4cd0-8e51-6a8d57035aa8" frameborder="0" allowFullScreen="true"></iframe>
                </div>
            </div >
        </>
    )
}

export default DashboardGralView