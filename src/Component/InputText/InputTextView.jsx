import React from 'react'

function InputTextView({placeholder, tipo}) {
    return (
        <>
            <div>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                        type={tipo}
                        name=""
                        id=""
                        className="block w-full rounded-md border-0 p-2 text-xs text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </>
    )
}

export default InputTextView