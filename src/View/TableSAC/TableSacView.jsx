import React from 'react'
import {
  Card,
  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
} from "@tremor/react";
import { DocumentTextIcon, DocumentIcon, DocumentReportIcon, ClipboardCheckIcon, CheckCircleIcon } from "@heroicons/react/solid";
import TableStandarView from "./Standar/TableStandarView";
import TableAuditView from "./Audit/TableAuditView";
import TableSACView from "./SAC/TableSACView";
import TableACView from './AC/TableACView';


function TableSacView() {
  return (
    <>
      <div className="mx-3 mb-10">
        <TabGroup>
          <TabList className="mt-3">
            <Tab className="text-lg" icon={CheckCircleIcon}>
              AC
            </Tab>
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
            <TabPanel>
              <Card>
                <TableACView />
              </Card>
            </TabPanel>
            <TabPanel>
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