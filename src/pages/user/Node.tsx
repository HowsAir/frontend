import { useEffect, useState } from 'react';
import { AirQualityGraph } from '../../components/widgets/AirQualityGraph';
import { MeasureCard } from '../../components/widgets/MeasureCard';
import { MonthlyObjective } from '../../components/widgets/MonthlyObjective';
import { getMonthlyDistance, getUsersDashboardData } from '../../api/apiClient';
import { getFormattedDate } from '../../utils/DateFormatter';
import { LastMeasurement } from '../../types/mainTypes';

const Node = () => {
    const todayDate = getFormattedDate();
    const [dailyDistance, setDailyDistance] = useState<number | null>(0);
    const [lastMeasurement, setLastMeasurement] = useState<LastMeasurement>({
        timestamp: '2024-12-01T00:00:00Z',
        airQuality: '',
        proportionalValue: 0,
        worstGas: '',
    });
    const [monthlyDistance, setMonthlyDistance] = useState<number>(0);

    let measurementDate = lastMeasurement.timestamp ? getFormattedDate(lastMeasurement.timestamp, new Date().toISOString(), 'relative') : 'No existe medicion';
    

    useEffect(() => {
        const getNodeData = async () => {
            try {
                let response = await getUsersDashboardData();
                setDailyDistance(response.todayDistance);
                setLastMeasurement(response.lastAirQualityReading);
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
        }

        getMonthDistance();
    }, []);

    return (
        <div className="mx-auto w-fit lg:w-full lg:px-24">
            <h3 className="mx-auto mb-10 lg:mx-0">
                Tu nodo a dia {todayDate}{' '}
            </h3>

            <div className="flex flex-col gap-12 lg:max-h-[60dvh] lg:flex-row">
                <div className="h-[481px] space-y-12 lg:space-y-6">
                    <div className="space-y-12 md:inline-flex md:gap-12 md:space-y-0">
                        <MeasureCard
                            title="Última medición"
                            date={measurementDate}
                            value={lastMeasurement.proportionalValue}
                            slider
                        />
                        {dailyDistance !== null && (
                            <MeasureCard
                                title="Recorrido"
                                date="Hoy"
                                value={dailyDistance}
                                type='m'
                            />
                        )}
                    </div>

                    <AirQualityGraph />
                </div>

                <MonthlyObjective objective={20} current={monthlyDistance} />
            </div>
        </div>
    );
};

export default Node;
