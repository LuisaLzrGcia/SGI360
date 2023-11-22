import { BarList, Bold, Flex, Text } from "@tremor/react";
import React from 'react'


function BarListView({ column1, column2, data }) {
    return (
        <>
            <Flex className="mt-4">
                <Text>
                    <Bold>{column1}</Bold>
                </Text>
                <Text>
                    <Bold>{column2}</Bold>
                </Text>
            </Flex>
            <BarList data={data} className="mt-2" color={data.color} />
        </>
    )
}

export default BarListView