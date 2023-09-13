import React from 'react'
import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";
import BarListView from '../../../Charts/BarListView';


function ObjetivosView() {
    const data = [
        { name: "Sistemas de Gestión", value: 93 },
        { name: "Seguridad y Medio Ambiente", value: 92 },
        { name: "Logística", value: 88 },
        { name: "S&OP", value: 88 },
        { name: "Crédito y cobranza", value: 53 },
        { name: "Ventas", value: 53 },
        { name: "Laboratorio Control de Calidad", value: 90 },
        { name: "Prod. Cloro e Hipoclorito", value: 88 },
        { name: "Prod. Sosa - Serv. Auxiliares", value: 91 },
        { name: "Planta de Sal", value: 95 },
        { name: "Distribución", value: 91 },
        { name: "Finanzas", value: 93 },
        { name: "Almacén", value: 96 },
        { name: "Compras", value: 85 },
        { name: "Mantenimiento", value: 88 },
        { name: "Proyectos y Procesos", value: 92 },
        { name: "Recursos Humanos", value: 89 }
    ];

    const chartData = data.map(item => ({
        ...item,
        color: item.value >= 80 ? "emerald" : item.value >= 60 ? "yellow" : "red"
    }));


    return (
        <>
            <Card className="">
                <Title>Objetivos</Title>
                <BarListView column1="Proceso" column2="% Alcanzado" data={chartData} />
            </Card>
        </>
    )
}

export default ObjetivosView