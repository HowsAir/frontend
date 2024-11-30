import { usePagination } from '../../hooks/TablePagination';
import { UserStatistics } from '../../api/data';

interface TablePagesProps {
    data: UserStatistics[];
    pageLength: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const TablePages: React.FC<TablePagesProps> = ({
    data,
    pageLength,
    currentPage,
    onPageChange,
}) => {
    const {
        handlePageClick,
        handleInputChange,
        handleInputPageSubmit,
        generatePageNumbers,
        inputPage,
        totalPages,
    } = usePagination(data, pageLength, currentPage, onPageChange);

    return (
        <div
            className={`${totalPages == 1 ? 'hidden' : ''} mx-auto my-2 w-fit`}
        >
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${totalPages === 0 ? 'hidden' : ''} rounded-lg px-4 py-1.5 transition-opacity duration-300 ease-in-out disabled:opacity-30`}
            >
                &lt;
            </button>

            {generatePageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`rounded-lg bg-sky-100 px-4 py-1.5 transition-all duration-500 ease-in-out ${
                        page === currentPage
                            ? 'bg-opacity-100 text-primary'
                            : 'bg-opacity-0'
                    }`}
                >
                    {page}
                </button>
            ))}

            {totalPages > 10 && currentPage <= totalPages - 3 && (
                <span>...</span>
            )}

            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${totalPages === 0 ? 'hidden' : ''} rounded-lg px-4 py-1.5 transition-opacity duration-300 ease-in-out disabled:opacity-30`}
            >
                &gt;
            </button>

            {/* Input for typing a page number */}
            {totalPages > 10 && (
                <div>
                    <input
                        type="number"
                        value={inputPage}
                        onChange={handleInputChange}
                        onKeyDown={handleInputPageSubmit}
                        placeholder="Go to page"
                    />
                </div>
            )}
        </div>
    );
};
