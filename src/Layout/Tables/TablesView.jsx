import {
    ProgressBar,
    Card,
    Flex,
    Text,
    Metric,
    TabList,
    Tab,
    TabGroup,
    TabPanels,
    TabPanel,
    Title,
    BarChart
} from "@tremor/react";
import TablesFormat from "../../View/TablesFormat/TablesFormat";

function TablesView() {
    
    return (
        <>
            <div className="mx-3 mb-5">
                <TabGroup>
                    <TabList className="mt-3">
                        <Tab>
                            Desempeño
                        </Tab>
                        <Tab>
                            Control documental
                        </Tab>
                        <Tab>
                            Objetivos cumplidos
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel >
                            <div className="m-5">
                                <TablesFormat />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="m-5">
                                <TablesFormat />
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

export default TablesView