import React from 'react'
import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";
import BarListView from '../../../Charts/BarListView';

function CtrlDocumentalView() {
    const data = [
        { name: "Sistemas de Gestión", value: 86 },
        { name: "Seguridad y Medio Ambiente", value: 89 },
        { name: "Logística", value: 100 },
        { name: "S&OP", value: 100 },
        { name: "Crédito y cobranza", value: 100 },
        { name: "Ventas", value: 100 },
        { name: "Laboratorio Control de Calidad", value: 98 },
        { name: "Prod. Cloro e Hipoclorito", value: 38 },
        { name: "Prod. Sosa - Serv. Auxiliares", value: 100 },
        { name: "Planta de Sal", value: 100 },
        { name: "Distribución", value: 62 },
        { name: "Finanzas", value: 100 },
        { name: "Almacén", value: 100 },
        { name: "Compras", value: 100 },
        { name: "Mantenimiento", value: 32 },
        { name: "Proyectos y Procesos", value: 100 },
        { name: "Recursos Humanos", value: 50 }
    ];    

    const chartData = data.map(item => ({
        ...item,
        color: item.value >= 80 ? "emerald" : item.value >= 60 ? "yellow" : "red"
    }));

    return (
        <>
            <Card className="">
                <Title>Control Documental</Title>
                <BarListView column1="Proceso" column2="% Alcanzado" data={chartData} />
            </Card>
        </>
    )
}

export default CtrlDocumentalView