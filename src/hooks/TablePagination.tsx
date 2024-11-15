import { useState } from 'react';

// Custom hook to handle pagination
const usePagination = (data: any[], pageSize: number) => {
    const totalPages = Math.ceil(data.length / pageSize);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState('');

    const currentData = data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setInputPage(''); // Reset input when changing page via buttons
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPage(e.target.value);
    };

    const handleInputPageSubmit = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && inputPage) {
            const page = parseInt(inputPage, 10);
            handlePageClick(page);
        }
    };

    const generatePageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i <= 3 ||
                i >= totalPages - 2 ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                pageNumbers.push(i);
            }
        }

        return pageNumbers;
    };

    return {
        currentData,
        currentPage,
        handlePageClick,
        handleInputChange,
        handleInputPageSubmit,
        generatePageNumbers,
        inputPage,
        totalPages,
    };
};

export default usePagination;
