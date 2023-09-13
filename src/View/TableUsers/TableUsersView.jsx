import {
    Card,
    Flex,
    Text,
    TabList,
    Tab,
    TabGroup,
    TabPanels,
    TabPanel,
} from "@tremor/react";
import { UserIcon, BriefcaseIcon, OfficeBuildingIcon, UserGroupIcon } from "@heroicons/react/solid";
import TableAllUserView from "./TableAllUserView";
import TableAllProcessView from "./TableAllProcessView";
function TableUsersView() {
    return (
        <>
            <div className="mx-3 mb-5">
                <TabGroup>
                    <TabList className="mt-3">
                        <Tab className="text-lg" icon={UserIcon}>
                            Encargados
                        </Tab>
                        <Tab className="text-lg" icon={OfficeBuildingIcon}>Procesos</Tab>
                        <Tab className="text-lg" icon={UserGroupIcon}>Usuarios</Tab>
                        <Tab className="text-lg" icon={BriefcaseIcon}>Puestos</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel className="p-5">
                            <Card className="">
                                <TableAllUserView/>
                            </Card>
                        </TabPanel>
                        <TabPanel>
                        <Card className="">
                                <TableAllProcessView/>
                            </Card>
                        </TabPanel>
                        <TabPanel>
                            jola3
                        </TabPanel>
                        <TabPanel>
                            hola4
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </>
    )
}

export default TableUsersView