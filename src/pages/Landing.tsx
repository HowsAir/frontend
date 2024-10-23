import { useEffect, useState } from "react";
import * as apiClient from "../api/apiClient";
import Medicion from "../components/Medicion";
import { MeasurementData } from "../api/data";

const Landing = () => {
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
      <div className="container mx-auto flex-1 mb-8">
        <h1 className="text-center font-semibold text-4xl">
          Controla la calidad del aire a tu alrededor
        </h1>
      </div>
      <h2 className="text-xl font-normal mb-4 text-left">
        Últimas mediciones:
      </h2>

      {loading ? (
        <p className="text-center">Cargando mediciones...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediciones.length > 0 ? (
            mediciones.map((medicion) => (
              <Medicion
                key={medicion._id}
                _id={medicion._id}
                fecha={medicion.fecha}
                ppm={medicion.ppm}
                temperatura={medicion.temperatura}
                latitud={medicion.latitud}
                longitud={medicion.longitud}
              />
            ))
          ) : (
            <p className="text-center col-span-full">
              No hay mediciones disponibles
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default Landing;
