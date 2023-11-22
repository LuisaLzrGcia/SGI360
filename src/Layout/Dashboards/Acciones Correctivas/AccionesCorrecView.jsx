import React from 'react'

import {
  Card,
  Title,
  Text,
  LineChart,
  TabList,
  Tab,
  TabGroup,
  TabPanel,
  TabPanels,
  BarChart,
  Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, TableFoot, TableFooterCell
} from "@tremor/react";
import { ViewListIcon, ChartSquareBarIcon } from "@heroicons/react/outline";

function AccionesCorrecView() {
  const chartData = [
    { estandar: "LAPEM", abiertas: 2, cerradas: 9, total: 11 },
    { estandar: "SMETA", abiertas: 1, cerradas: 20, total: 21 },
    { estandar: "9001/14001 Interna 2022", abiertas: 2, cerradas: 22, total: 24 },
    { estandar: "9001/14001 Externa 2022", abiertas: 0, cerradas: 1, total: 1 },
    { estandar: "45001 Externa 2023", abiertas: 0, cerradas: 1, total: 1 },
    { estandar: "AAR Interna 2022", abiertas: 3, cerradas: 13, total: 16 },
    { estandar: "AAR Externa 2022", abiertas: 1, cerradas: 4, total: 5 }
  ];

  const newData = chartData.map(item => {
    const porcentaje = Math.round((item.cerradas / item.total) * 100);
    return { ...item, porcentaje };
  });

  const dataFormatter = (number) => {
    return "" + Intl.NumberFormat("mx").format(number).toString();
  };

  return (
    <>
      <TabGroup>
        <div className="block sm:flex sm:justify-between">
          <div>
            <Title>Acciones Correctivas</Title>
            <Text>Agosto 2023</Text>
          </div>
          <div className="mt-4 sm:mt-0">
            <TabList variant="solid">
              <Tab icon={ChartSquareBarIcon}>Gráfica</Tab>
              <Tab icon={ViewListIcon}>Datos</Tab>
            </TabList>
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            <BarChart
              className="mt-6"
              data={newData}
              index="estandar"
              categories={["porcentaje"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
            />
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-3">
              <BarChart
                className="mt-6"
                data={newData}
                index="estandar"
                categories={["porcentaje"]}
                colors={["blue"]}
                valueFormatter={dataFormatter}
                yAxisWidth={48}
              />
              <div>
                <Table className="mt-5">
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell className="p-1 text-left">Estandar</TableHeaderCell>
                      <TableHeaderCell className="p-1 text-left">Abiertas</TableHeaderCell>
                      <TableHeaderCell className="p-1 text-left">Cerradas</TableHeaderCell>
                      <TableHeaderCell className="p-1 text-left">Total</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newData.map((item) => (
                      <TableRow key={item.estandar}>
                        <TableCell className="p-2 text-right">{item.estandar}</TableCell>
                        <TableCell className="p-2 text-center">
                          <Text>{item.abiertas}</Text>
                        </TableCell>
                        <TableCell className="p-2 text-center">
                          <Text>{item.cerradas}</Text>
                        </TableCell>
                        <TableCell className="p-2 text-center">
                          <Text>{item.total}</Text>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup >
    </>
  )
}

export default AccionesCorrecView