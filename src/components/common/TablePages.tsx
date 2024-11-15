import usePagination from "../../hooks/tablePagination";
import { UserStatistics } from "../../types/mainTypes";

interface TablePagesProps {
    data: UserStatistics[];

    pageLength: number;
}

export const TablePages: React.FC<TablePagesProps> = ({ data, pageLength }) => {
    const {
        currentData,
        currentPage,
        handlePageClick,
        handleInputChange,
        handleInputPageSubmit,
        generatePageNumbers,
        inputPage,
        totalPages,
    } = usePagination(data, pageLength);

    return (
        <div className="mx-auto my-2 w-fit">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${totalPages === 0 ? 'hidden' : ''} rounded-lg px-4 py-1.5 disabled:opacity-30`}
            >
                &lt;
            </button>

            {generatePageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`rounded-lg px-4 py-1.5 ${page === currentPage ? 'bg-sky-100 text-primary' : ''} `}
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
                className={`${totalPages === 0 ? 'hidden' : ''} rounded-lg px-4 py-1.5 disabled:opacity-30`}
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
