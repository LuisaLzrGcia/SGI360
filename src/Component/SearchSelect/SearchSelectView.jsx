import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { useEffect, useState } from "react";

export default function SearchSelectView({ placeholder = "", select = "", setSelectValue, valores }) {
    const [selectedValue, setSelectedValue] = useState(select);

    const handleValueChange = (selectedValue) => {
        setSelectValue(selectedValue)
      };
    

    return (
        <SearchSelect
            placeholder={placeholder}
            defaultValue={select}
            onValueChange={handleValueChange}
            className="w-full"
        >
            {valores.map((item, index) => (
                <SearchSelectItem
                    className="text-black bg-white"
                    value={item}
                    key={index}
                >
                    {item}
                </SearchSelectItem>
            ))}
        </SearchSelect>
    );
}
