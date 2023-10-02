import React, { useState } from 'react'
import getData from '../../Hooks/getData';

export default function PaginationView({ items, setCurrentItems, length, url, setPageCurrent }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Cantidad de elementos por página
    const totalPages = Math.ceil(length / itemsPerPage);

    const handlePageChange = async (pageNumber) => {
        const processPage = await getData(url+pageNumber);
        const indexOfLastItem = pageNumber * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentPage(pageNumber);
        setPageCurrent(pageNumber)
        setCurrentItems(processPage);
    };

    const handleBack = () => {
        if (currentPage === 1) {
            handlePageChange(totalPages);
        } else {
            handlePageChange(currentPage - 1);
        }
    }

    const handleNext = () => {
        if (currentPage === totalPages) {
            handlePageChange(1);
        } else {
            handlePageChange(currentPage + 1);
        }
    }

    return (
        <>
            <div
                className="flex justify-center">
                <ul className="flex">
                    <button
                        onClick={handleBack}
                        className='rounded-l-lg bg-gray-300 hover:bg-slate-500 hover:text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-2 ${currentPage === index + 1
                                    ? 'bg-slate-700 text-white'
                                    : 'bg-gray-300 hover:bg-slate-500 hover:text-white'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <button
                        onClick={handleNext}
                        className='rounded-r-lg bg-gray-300 hover:bg-slate-500 hover:text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </ul>
            </div>
        </>
    )
}