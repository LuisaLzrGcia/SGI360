import React from 'react'
import {
    Card,
    TabList,
    Tab,
    TabGroup,
    TabPanels,
    TabPanel,
} from "@tremor/react";
import { UserIcon, BriefcaseIcon, OfficeBuildingIcon, UserGroupIcon } from "@heroicons/react/solid";
import TableUserView from "./Users/TableUserView";
import TableProcessView from "./Process/TableProcessView";
function ManagerView() {
    return (
        <>
            <div className="mx-3 mb-10">
                <TabGroup>
                    <TabList className="mt-3">
                        <Tab className="text-lg" icon={UserIcon}>
                            Usuarios
                        </Tab>
                        <Tab className="text-lg" icon={OfficeBuildingIcon}>
                            Procesos
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel className="">
                            <Card>
                                <TableUserView />
                            </Card>
                        </TabPanel>
                        <TabPanel>
                            <Card>
                                <TableProcessView />
                            </Card>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </>
    )
}

export default ManagerView