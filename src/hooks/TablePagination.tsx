import { useState, useMemo } from 'react';

export const usePagination = (
    data: any[],
    pageLength: number,
    currentPage: number,
    onPageChange: (page: number) => void
) => {
    const [inputPage, setInputPage] = useState('');

    const totalPages = useMemo(
        () => Math.ceil(data.length / pageLength),
        [data.length, pageLength]
    );

    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page); // Notify parent of page change
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPage(event.target.value);
    };

    const handleInputPageSubmit = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            const page = parseInt(inputPage, 10);
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
                onPageChange(page); // Notify parent of page change
            }
        }
    };

    const generatePageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    return {
        handlePageClick,
        handleInputChange,
        handleInputPageSubmit,
        generatePageNumbers,
        inputPage,
        totalPages,
    };
};
