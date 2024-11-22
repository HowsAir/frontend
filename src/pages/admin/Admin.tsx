import { useQuery } from 'react-query';
import * as apiClient from '../../api/apiClient';
import { TablePages } from '../../components/common/TablePages';

const Admin = () => {
    const {
        data: statistics = [],
        isLoading: loading,
        isError,
    } = useQuery('userStatistics', apiClient.getUserStatistics, {
        refetchInterval: 10000,
        onError: (error) => {
            console.error('Error fetching statistics:', error);
        },
    });

    return (
        <div className="mx-auto w-fit overflow-hidden rounded-lg border-[1px] border-gray bg-white">
            <p className="m-4 inline-flex items-center gap-2">
                Usuarios{' '}
                <div className="rounded-full bg-sky-100 px-2 text-base text-primary">
                    {statistics.length} usuarios
                </div>
            </p>
            {loading ? (
                <p>Cargando Usuarios...</p>
            ) : isError ? (
                <p>Error al cargar usuarios. Inténtelo de nuevo más tarde.</p>
            ) : (
                <>
                    <table className="table-auto">
                        <thead>
                            <tr className="border-b-[1px] border-gray bg-[#F9FAFB]">
                                <th className="px-5 py-1 font-normal text-neutral-600">
                                    Usuario_ID
                                </th>
                                <th className="px-5 py-1 font-normal text-neutral-600">
                                    Nombre
                                </th>
                                <th className="px-5 py-1 font-normal text-neutral-600">
                                    Teléfono
                                </th>
                                <th className="px-5 py-1 font-normal text-neutral-600">
                                    Nodo_ID
                                </th>
                                <th className="px-5 py-1 font-normal text-neutral-600">
                                    Media Horas Activas/Día
                                </th>
                                <th className="px-5 py-1 font-normal text-neutral-600">
                                    Media Recorrido/Día
                                </th>
                                <th className="px-5 py-1 font-normal text-neutral-600">
                                    Última conexión
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {statistics.length > 0 ? (
                                statistics.map((statistic) => (
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
                    <TablePages data={statistics} pageLength={10} />
                </>
            )}
        </div>
    );
};

export default Admin;
