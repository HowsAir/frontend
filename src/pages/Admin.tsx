import { useEffect, useState } from 'react';
import * as apiClient from '../api/apiClient';
import { UserStatistics } from '../types/mainTypes';

const Admin = () => {
    const [statistics, setStatistics] = useState<UserStatistics[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchStatistics = async () => {
            try {
                const data = await apiClient.getUserStatistics();
                if (isMounted) {
                    console.log('Statistics:', data);
                    setStatistics(data);
                }
            } catch (error) {
                console.error('Error fetching statistics:', error);
                if (isMounted) setStatistics([]);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchStatistics();
        const interval = setInterval(fetchStatistics, 10000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="mx-auto w-fit overflow-hidden rounded-lg border-[1px] border-gray bg-white">
            <p className="m-4 inline-flex gap-2 items-center">
                Usuarios <div className='text-base px-2 text-primary bg-sky-100 rounded-full'>{statistics.length} usuarios</div>
            </p>
            {loading ? (
                <p>Cargando Usuarios...</p>
            ) : (
                <table className="">
                    <thead>
                        <tr className="border-b-[1px] border-gray bg-[#F9FAFB] ">
                            <th className="px-5 py-1 font-normal text-neutral-600">Usuario_ID</th>
                            <th className="px-5 py-1 font-normal text-neutral-600">Nombre</th>
                            <th className="px-5 py-1 font-normal text-neutral-600">Telefono</th>
                            <th className="px-5 py-1 font-normal text-neutral-600">Nodo_ID</th>
                            <th className="px-5 py-1 font-normal text-neutral-600">
                                Media Horas Activas/Día
                            </th>
                            <th className="px-5 py-1 font-normal text-neutral-600">Media Recorrido/Día</th>
                            <th className="px-5 py-1 font-normal text-neutral-600">Última conexión</th>
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
                                <td colSpan={7}>No hay datos disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Admin;