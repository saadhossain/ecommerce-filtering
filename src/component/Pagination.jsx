import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages }) => {

    const [searchParams, setSearchParams] = useSearchParams();

    //Page Change Handler
    const goToPage = (pageNumber) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', pageNumber);
        setSearchParams(newParams);
    };
    return (
        <div className='flex items-center justify-center my-5'>
            {/* Previous Button */}
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => goToPage(i + 1)}
                    className={`py-1 px-2 mx-1 rounded ${currentPage === i + 1 ? 'bg-blue-500' : 'bg-gray-900'}`}
                >
                    {i + 1}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;