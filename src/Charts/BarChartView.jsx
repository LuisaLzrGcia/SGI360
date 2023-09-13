import {
    BarChart
} from "@tremor/react";

function BarChartView({data}) {
    const dataFormatter = (number) => {
        return Intl.NumberFormat("mx", { style: "decimal" }).format(number);
    };
    return (
        <>
            <BarChart
                className="mt-6"
                data={data}
                index="nameX"
                categories={["Desempeño"]}
                colors={["blue"]}
                valueFormatter={dataFormatter}
                yAxisWidth={24}
                showTooltip="true"
                showAnimation="false"
            >
                {data.map((entry, index) => (
                    <text
                        key={index}
                        x={index * (600 / data.length) + (600 / (data.length * 2))}
                        y={entry.Desempeño > 10 ? 0 : -10}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="black"
                    >
                        {entry.Desempeño}
                    </text>
                ))}
            </BarChart>
        </>
    )
}

export default BarChartView