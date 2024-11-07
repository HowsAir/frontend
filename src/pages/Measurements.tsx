import { useEffect, useState } from 'react';
import * as apiClient from '../api/apiClient';
import Medicion from '../components/widgets/MeasureCard';
import { MeasurementData } from '../api/data';

const Measurements = () => {
    const [mediciones, setMediciones] = useState<MeasurementData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMediciones = async () => {
            try {
                const data = await apiClient.getMeasurements();
                setMediciones(data);
            } catch (error) {
                //Gestionar error
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        // Ejecutar la función inmediatamente al montar el componente
        fetchMediciones();

        // Configurar la actualización cada 10 segundos (10000 ms)
        const interval = setInterval(() => {
            fetchMediciones();
        }, 10000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="container mx-auto py-10">
            <div className="container mx-auto mb-8 flex-1">
                <h1 className="text-center text-4xl font-semibold">
                    Controla la calidad del aire a tu alrededor
                </h1>
            </div>
            <h2 className="mb-4 text-left text-xl font-normal">
                Últimas mediciones:
            </h2>

            {loading ? (
                <p className="text-center">Cargando mediciones...</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mediciones.length > 0 ? (
                        mediciones.map((medicion) => (
                            <Medicion
                                key={medicion.id}
                                id={medicion.id}
                                timestamp={medicion.timestamp}
                                o3Value={medicion.o3Value}
                                no2Value={medicion.no2Value}
                                coValue={medicion.coValue}
                                latitude={medicion.latitude}
                                longitude={medicion.longitude}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center">
                            No hay mediciones disponibles
                        </p>
                    )}
                </div>
            )}
        </main>
    );
};

export default Measurements;
