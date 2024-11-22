import { useQuery } from 'react-query';
import * as apiClient from '../../api/apiClient';
import { TablePages } from '../../components/common/TablePages';
import { useState, useMemo, ChangeEvent } from 'react';

// Define types for the statistics data
interface Statistic {
    id: number;
    name: string;
    surnames: string;
    phone: string;
    nodeId: number;
    averageDailyActiveHours: number;
    averageDailyDistance: number;
    nodeLastConnection: string;
}

const Admin = () => {
    // State for sorting configuration
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Statistic | '';
        direction: 'asc' | 'desc';
    }>({
        key: 'id',
        direction: 'asc',
    });

    // State for search term
    const [searchTerm, setSearchTerm] = useState<string>('');

    // State for current page in pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageLength = 10;

    // Fetch statistics using react-query
    const {
        data: statistics = [],
        isLoading: loading,
        isError,
    } = useQuery<Statistic[]>('userStatistics', apiClient.getUserStatistics, {
        refetchInterval: 10000,
        onError: (error) => {
            console.error('Error fetching statistics:', error);
        },
    });

    // Memoize filtered statistics to avoid unnecessary recalculations
    const filteredStatistics = useMemo(() => {
        const searchString = searchTerm.toLowerCase();
        return statistics.filter((statistic) => {
            const fieldsToCheck: (keyof Statistic)[] = [
                'id',
                'name',
                'surnames',
                'phone',
                'nodeId',
                'averageDailyActiveHours',
                'averageDailyDistance',
                'nodeLastConnection',
            ];
            return fieldsToCheck.some((field) => {
                const value = statistic[field];
                return (
                    value != null &&
                    value.toString().toLowerCase().includes(searchString)
                );
            });
        });
    }, [searchTerm, statistics]);

    // Memoized sorted statistics
    const sortedStatistics = useMemo(() => {
        const sortedData = [...filteredStatistics];
        if (sortConfig.key) {
            sortedData.sort((a, b) => {
                if (sortConfig.key && (a[sortConfig.key] == null || b[sortConfig.key] == null)) return 0; // Handle null values

                if (sortConfig.key && a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (sortConfig.key && a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedData;
    }, [filteredStatistics, sortConfig]);

    // Handle sorting
    const handleSort = (key: keyof Statistic) => {
        setSortConfig((prevConfig) => {
            const newDirection =
                prevConfig.key === key && prevConfig.direction === 'asc'
                    ? 'desc'
                    : 'asc';
            return { key, direction: newDirection };
        });
    };

    // Paginate the sorted data
    const paginatedStatistics = useMemo(() => {
        return sortedStatistics.slice(
            (currentPage - 1) * pageLength,
            currentPage * pageLength
        );
    }, [sortedStatistics, currentPage]);

    // Handle search input change
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="mx-auto w-fit overflow-hidden rounded-lg border-[1px] border-gray bg-white">
            <p className="m-4 inline-flex items-center gap-2">
                Usuarios{' '}
                <div className="rounded-full bg-sky-100 px-2 text-base text-primary">
                    {filteredStatistics.length} usuarios
                </div>
            </p>
            {loading ? (
                <p>Cargando Usuarios...</p>
            ) : isError ? (
                <p className="text-red-500">
                    Error al cargar usuarios. Inténtelo de nuevo más tarde.
                </p>
            ) : (
                <>
                    <table className="relative table-auto">
                        <input
                            onChange={handleSearchChange}
                            value={searchTerm}
                            className="absolute -top-12 right-3 rounded-lg border-[1px] border-gray bg-neutral-50 px-2 caret-primary placeholder:font-normal focus:outline-primary"
                            placeholder="Buscar..."
                        />
                        <thead>
                            <tr className="border-b-[1px] border-gray bg-[#F9FAFB]">
                                <th
                                    className="min-w-[150px] cursor-pointer px-5 py-1 font-normal text-neutral-600"
                                    onClick={() => handleSort('id')}
                                >
                                    Usuario_ID
                                    {sortConfig.key === 'id' &&
                                        (sortConfig.direction === 'asc'
                                            ? ' ↑'
                                            : ' ↓')}
                                </th>
                                <th
                                    className="cursor-pointer px-5 py-1 font-normal text-neutral-600"
                                    onClick={() => handleSort('name')}
                                >
                                    Nombre
                                    {sortConfig.key === 'name' &&
                                        (sortConfig.direction === 'asc'
                                            ? ' ↑'
                                            : ' ↓')}
                                </th>
                                <th
                                    className="cursor-pointer px-5 py-1 font-normal text-neutral-600"
                                    onClick={() => handleSort('phone')}
                                >
                                    Teléfono
                                    {sortConfig.key === 'phone' &&
                                        (sortConfig.direction === 'asc'
                                            ? ' ↑'
                                            : ' ↓')}
                                </th>
                                <th
                                    className="min-w-[120px] cursor-pointer px-5 py-1 font-normal text-neutral-600"
                                    onClick={() => handleSort('nodeId')}
                                >
                                    Nodo_ID
                                    {sortConfig.key === 'nodeId' &&
                                        (sortConfig.direction === 'asc'
                                            ? ' ↑'
                                            : ' ↓')}
                                </th>
                                <th
                                    className="min-w-[230px] cursor-pointer px-5 py-1 font-normal text-neutral-600"
                                    onClick={() =>
                                        handleSort('averageDailyActiveHours')
                                    }
                                >
                                    Media Horas Activas/Día
                                    {sortConfig.key ===
                                        'averageDailyActiveHours' &&
                                        (sortConfig.direction === 'asc'
                                            ? ' ↑'
                                            : ' ↓')}
                                </th>
                                <th
                                    className="min-w-[210px] cursor-pointer px-5 py-1 font-normal text-neutral-600"
                                    onClick={() =>
                                        handleSort('averageDailyDistance')
                                    }
                                >
                                    Media Recorrido/Día
                                    {sortConfig.key ===
                                        'averageDailyDistance' &&
                                        (sortConfig.direction === 'asc'
                                            ? ' ↑'
                                            : ' ↓')}
                                </th>
                                <th
                                    className="cursor-pointer px-5 py-1 font-normal text-neutral-600"
                                    onClick={() =>
                                        handleSort('nodeLastConnection')
                                    }
                                >
                                    Última conexión
                                    {sortConfig.key === 'nodeLastConnection' &&
                                        (sortConfig.direction === 'asc'
                                            ? ' ↑'
                                            : ' ↓')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedStatistics.length > 0 ? (
                                paginatedStatistics.map((statistic) => (
                                    <tr
                                        key={statistic.id}
                                        className="border-b-[1px] border-gray"
                                    >
                                        <td className="px-5 py-4">
                                            {statistic.id}
                                        </td>
                                        <td className="px-5 py-4">
                                            {statistic.name +
                                                ' ' +
                                                statistic.surnames}
                                        </td>
                                        <td className="px-5 py-4">
                                            {statistic.phone}
                                        </td>
                                        <td className="px-5 py-4">
                                            {statistic.nodeId}
                                        </td>
                                        <td className="px-5 py-4">
                                            {statistic.averageDailyActiveHours}
                                        </td>
                                        <td className="px-5 py-4">
                                            {statistic.averageDailyDistance}
                                        </td>
                                        <td className="px-5 py-4">
                                            {statistic.nodeLastConnection}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="py-6 text-center"
                                    >
                                        No hay datos disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <TablePages
                        data={sortedStatistics}
                        pageLength={pageLength}
                        // currentPage={currentPage}
                        // onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default Admin;
