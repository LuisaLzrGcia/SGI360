import { useState } from "react";
import { DateRangePicker, DateRangePickerItem } from "@tremor/react";
import { es } from "date-fns/locale";



function InputDateView() {
    return (
        <>
            <DateRangePicker className="w-fit" enableSelect={false} />
        </>
    )
}

export default InputDateView