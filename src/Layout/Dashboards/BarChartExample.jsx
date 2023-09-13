import React, { useEffect, useState } from 'react';

const BarChartExample = () => {
    const chartData = [
        {
            nameX: "",
            name: "",
        },
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

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <>
            <div className='bg-blue-200 w-full flex items-end h-80'>
                {chartData.map((item, index) => (
                    <div
                        key={index}
                        className={`px-2 ${loaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'} transition-all ease-in-out duration-1000`}
                        style={{
                            width: 'calc(100% / 17)',
                        }}
                    >
                        <div className='flex justify-center items-end h-64'>
                            <div
                                className={`w-full bg-blue-700 z-1 flex justify-center transform transition-all ease-in-out duration-1000 origin-bottom ${loaded ? 'scale-y-1' : 'scale-y-0'}`}
                                style={{
                                    height: `${item.Desempeño}%`,
                                }}
                            >
                                <span className='-m-5 transition-transform duration-150 ease-out'>
                                    {item.Desempeño}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-full flex h-44 border-t-2 bg-white border-black z-10'>
                {chartData.map((item, index) => (
                    <div className='flex justify-centerh-full '
                        style={{
                            width: `calc(100% / ${chartData.length})`,
                        }}>
                        <div className='flex' style={{ fontSize: '10px' }}>
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BarChartExample;
