import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { useUser } from '../../contexts/UserContext';
import { MeasureCard } from '../../components/widgets/MeasureCard';
import { useEffect, useState } from 'react';
import { getUsersDashboardData } from '../../api/apiClient';
import { Measurement, OverallAirQuality } from '../../types/mainTypes';
import { getFormattedDate } from '../../utils/DateFormatter';
import { MapComponent } from '../../components/layouts/MapComponent';

const Portal = () => {
    const { user } = useUser();

    const [dailyDistance, setDailyDistance] = useState<{
        d: number;
        t: string;
    }>({ d: 0, t: 'm' });
    const [lastMeasurement, setLastMeasurement] = useState<Measurement>({
        timestamp: new Date().toISOString(),
        airQuality: '',
        proportionalValue: 0,
        gas: '',
        ppmValue: 0,
    });
    const [overallAirQuality, setOverallAirQuality] = useState<string | null>(
        null
    );

    useEffect(() => {
        const getNodeData = async () => {
            try {
                let response = await getUsersDashboardData();
                let todayDistance = { d: response.todayDistance, t: 'm' };
                if (todayDistance && todayDistance.d >= 1000) {
                    todayDistance = {
                        d: parseFloat((todayDistance.d / 1000).toFixed(1)),
                        t: 'km',
                    };
                }
                setDailyDistance(todayDistance || { d: 0, t: 'm' });
                setLastMeasurement(response.lastAirQualityReading);
                let airQuality =
                    response.airQualityReadingsInfo.overallAirQuality;
                switch (airQuality) {
                    case 'Good':
                        setOverallAirQuality(OverallAirQuality.Good);
                        break;
                    case 'Regular':
                        setOverallAirQuality(OverallAirQuality.Regular);
                        break;
                    case 'Bad':
                        setOverallAirQuality(OverallAirQuality.Bad);
                        break;
                    default:
                        setOverallAirQuality(null);
                        break;
                }
            } catch (error) {
                console.error('Error fetching node data:', error);
            }
        };

        getNodeData();
    }, []);

    let measurementDate = lastMeasurement.timestamp
        ? getFormattedDate(
              lastMeasurement.timestamp,
              'compact',
              false,
              new Date().toISOString(),
          )
        : 'No existe medicion';

    return (
        <div className="mx-auto w-fit lg:w-full lg:px-24">
            <h3 className="w-full">
                Bienvenide a tu portal, {user ? user.name : ''}
            </h3>

            <div className="mt-12 grid grid-cols-6 gap-20">
                <div className="col-span-4">
                    <div className="mb-6 flex items-center gap-4">
                        <h3 className="text-4xl font-medium">Mapa general</h3>
                        <Link
                            className="mb-1 text-2xl font-normal text-primary underline"
                            to={routes.HOME.MAPS}
                        >{`Ver grande >`}</Link>
                    </div>
                    <MapComponent portal />
                </div>
                <div className="col-span-2">
                    <div className="mb-6 flex items-center gap-4">
                        <h3 className="text-4xl font-medium">Tu nodo</h3>
                        <Link
                            className="mb-1 text-2xl font-normal text-primary underline"
                            to={routes.USER.NODE}
                        >{`Más datos >`}</Link>
                    </div>
                    <div className="flex flex-col gap-6">
                        <MeasureCard
                            title="Ultima medición"
                            value={lastMeasurement.ppmValue}
                            type={lastMeasurement.gas}
                            date={measurementDate}
                            slider={lastMeasurement.proportionalValue}
                            average={overallAirQuality}
                        />
                        <MeasureCard
                            value={dailyDistance.d}
                            type={dailyDistance.t}
                            date="00:00 - Ahora"
                            title="Recorrido"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portal;
