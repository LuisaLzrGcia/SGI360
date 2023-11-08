import React from 'react'
import {
  Card,
  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
} from "@tremor/react";
import { DocumentTextIcon, ViewListIcon, DocumentReportIcon, ClipboardCheckIcon } from "@heroicons/react/solid";
import TableStandarView from "./Standar/TableStandarView";
import TableAuditView from "./Audit/TableAuditView";
import TableSACView from "./SAC/TableSACView";


function TableSacView() {
  return (
    <>
      <div className="mx-3 mb-10">
        <TabGroup>
          <TabList className="mt-3">
            <Tab className="text-lg" icon={DocumentTextIcon}>
              SAC
            </Tab>
            <Tab className="text-lg" icon={DocumentReportIcon}>
              Auditoría
            </Tab>
            <Tab className="text-lg" icon={ClipboardCheckIcon}>
              Estándar
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel className="">
              <Card>
                <TableSACView />
              </Card>
            </TabPanel>
            <TabPanel>
              <Card>
                <TableAuditView />
              </Card>
            </TabPanel>
            <TabPanel>
              <Card>
                <TableStandarView />
              </Card>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </>
  )
}

export default TableSacView