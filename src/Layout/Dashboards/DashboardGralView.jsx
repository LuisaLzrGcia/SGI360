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
            <div className="mx-3 mb-5">
                <TabGroup>
                    <TabList className="mt-3">
                        <Tab icon={UserGroupIcon}>
                            Todos los procesos</Tab>
                        <Tab icon={UserIcon}>Sistemas de Gestión</Tab>
                        <Tab icon={UserIcon}>SyMA</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel >
                            <div className="m-5">
                                <Card>
                                    <Title>Desempeño de todos los procesos | Agosto 2023</Title>
                                    <BarChartView data={chartdata} />
                                </Card>
                            </div>
                            <div className="grid grid-cols-2 gap-5 mx-5">
                                <div>
                                    <Objetivos />
                                </div>
                                <div>
                                    <CtrlDocumental />
                                </div>
                                <Card className="col-span-2">
                                    <AccionesCorrec />
                                </Card>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="mt-10">
                                <Flex className="mt-4">
                                    <Text className="w-full">Product Z</Text>
                                    <Flex className="space-x-2" justifyContent="end">
                                        <Text>$ 99,484</Text>
                                        <Text>16%</Text>
                                    </Flex>
                                </Flex>
                                <ProgressBar value={12} className="mt-2" />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="mt-10">
                                <Flex className="mt-4">
                                    <Text className="w-full">Product Z</Text>
                                    <Flex className="space-x-2" justifyContent="end">
                                        <Text>$ 9,484</Text>
                                        <Text>6%</Text>
                                    </Flex>
                                </Flex>
                                <ProgressBar value={6} className="mt-2" />
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </>
    )
}

export default DashboardGralView