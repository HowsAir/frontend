import { useEffect, useState } from 'react';
import { AirQualityGraph } from '../../components/widgets/AirQualityGraph';
import { MeasureCard } from '../../components/widgets/MeasureCard';
import { MonthlyObjective } from '../../components/widgets/MonthlyObjective';
import { getMonthlyDistance, getUsersDashboardData } from '../../api/apiClient';
import { getFormattedDate } from '../../utils/DateFormatter';
import { Measurement, OverallAirQuality } from '../../types/mainTypes';

const Node = () => {
    const todayDate = getFormattedDate();
    const [dailyDistance, setDailyDistance] = useState<{
        d: number;
        t: string;
    }>({ d: 0, t: 'm' });
    const [lastMeasurement, setLastMeasurement] = useState<Measurement>({
        timestamp: new Date().toISOString(),
        airQuality: '',
        proportionalValue: 0,
        worstGas: '',
        ppmValue: 0,
    });
    const [monthlyDistance, setMonthlyDistance] = useState<number>(0);
    const [airQualityReadings, setAirQualityReadings] = useState<Measurement[]>(
        []
    );
    const [overallAirQuality, setOverallAirQuality] = useState<string | null>(
        null
    );

    let measurementDate = lastMeasurement.timestamp
        ? getFormattedDate(
              lastMeasurement.timestamp,
              new Date().toISOString(),
              'compact'
          )
        : 'No existe medicion';

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
                setAirQualityReadings(
                    response.airQualityReadingsInfo.airQualityReadings
                );
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

    useEffect(() => {
        const getMonthDistance = async () => {
            try {
                let response = await getMonthlyDistance();
                setMonthlyDistance(response);
            } catch (error) {
                console.error('Error fetching monthly distance:', error);
            }
        };

        getMonthDistance();
    }, []);

    return (
        <div className="mx-auto w-fit lg:w-full lg:px-24">
            <h3 className="mx-auto mb-10 lg:mx-0">
                Tu nodo a dia {todayDate}{' '}
                <button>
                    <img
                        alt="Elegir fecha"
                        src="../../../public/icons/calendar.svg"
                    />
                </button>
            </h3>

            <div className="flex flex-col gap-12 lg:max-h-[60dvh] lg:flex-row">
                <div className="h-[481px] space-y-12 lg:space-y-6">
                    <div className="space-y-12 md:inline-flex md:gap-12 md:space-y-0">
                        <MeasureCard
                            title="Última medición"
                            date={measurementDate}
                            type={lastMeasurement.worstGas}
                            value={lastMeasurement.ppmValue}
                            slider={lastMeasurement.proportionalValue}
                            average={overallAirQuality}
                        />
                        {dailyDistance !== null && (
                            <MeasureCard
                                title="Recorrido"
                                date="Hoy"
                                value={dailyDistance.d}
                                type={dailyDistance.t}
                            />
                        )}
                    </div>

                    <AirQualityGraph measurements={airQualityReadings} />
                </div>

                <MonthlyObjective objective={20} current={monthlyDistance} />
            </div>
        </div>
    );
};

export default Node;
