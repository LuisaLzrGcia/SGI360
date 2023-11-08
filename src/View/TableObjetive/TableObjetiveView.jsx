import React from 'react';
import {
    Card,
    TabList,
    Tab,
    TabGroup,
    TabPanels,
    TabPanel,
} from "@tremor/react";
import { BadgeCheckIcon, ViewListIcon, OfficeBuildingIcon, UserGroupIcon } from "@heroicons/react/solid";
import TableAchievementView from "./Achievement/TableAchievementView";
import TableObjetiveListView from "./Objetives/TableObjetiveListView";

function TableObjetiveView() {
    return (
        <>
            <div className="mx-3 mb-10">
                <TabGroup>
                    <TabList className="mt-3">
                        <Tab className="text-lg" icon={BadgeCheckIcon}>
                            Cumplimiento
                        </Tab>
                        <Tab className="text-lg" icon={ViewListIcon}>
                            Objetivos
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel className="">
                            <Card>
                                <TableAchievementView/>
                            </Card>
                        </TabPanel>
                        <TabPanel>
                            <Card>
                                <TableObjetiveListView/>
                            </Card>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </>
    )
}

export default TableObjetiveView