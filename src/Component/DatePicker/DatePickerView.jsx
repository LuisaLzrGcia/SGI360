import React from 'react'
import { DateRangePicker } from "@tremor/react";

export default function DatePickerView({setDate}) {
    const handleDateChange = (date) => {
        setDate(date)
      };
    return (
        <>
            <DateRangePicker 
            onValueChange={handleDateChange}
            className="max-w-fit" 
            enableSelect={false} />
        </>
    )
}

