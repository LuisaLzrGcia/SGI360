import { useEffect, useState } from "react";

export default function SelectView({ select = "", selectValue = "", valores }) {
    const [selectedValue, setSelectedValue] = useState(select);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        selectValue(selectedValue)
    }, [selectedValue]); // Este efecto se activará cuando selectedValue cambie

    return (
        <>
            <select
                defaultValue={select}
                onChange={handleChange}
                className="w-full border p-1 rounded-md text-black capitalize  bg-gray-50"
            >
                {valores.map((item, index) => (
                    <option
                        className="capitalize text-black bg-white"
                        value={item}
                        key={index}
                    >
                        {item}
                    </option>
                ))}
            </select>
        </>
    );
}
