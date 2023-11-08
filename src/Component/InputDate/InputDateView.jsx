import React from "react";
import { DateRangePicker } from "@tremor/react";



function InputDateView() {
    return (
        <>
            <DateRangePicker className="w-fit" enableSelect={false} />
        </>
    )
}

export default InputDateView