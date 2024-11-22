import { useEffect, useState } from 'react';
import { AirQualityGraph } from '../../components/widgets/AirQualityGraph';
import { MeasureCard } from '../../components/widgets/MeasureCard';
import { MonthlyObjective } from '../../components/widgets/MonthlyObjective';
import { getUsersDailyDistance } from '../../api/apiClient';

const User = () => {
    const [dailyDistance, setDailyDistance] = useState<number | null>(null);

    useEffect(() => {
        const fetchDailyDistance = async () => {
            try {
                let distance = await getUsersDailyDistance();
                distance = Math.floor(distance); // Redondear hacia abajo para eliminar decimales
                if (distance > 999) {
                    distance = Math.floor(distance / 1000); // Dividir por 1000 si es mayor que 999
                }
                setDailyDistance(distance);
            } catch (error) {
                console.error('Error fetching daily distance:', error);
                setDailyDistance(0); // Manejar el caso de error
            }
        };

        fetchDailyDistance();
    }, []);

    return (
        <div className="mx-auto w-fit lg:w-full lg:px-24">
            <h3 className="mx-auto mb-10 lg:mx-0">Tu nodo hoy</h3>

            <div className="flex flex-col gap-12 lg:max-h-[60dvh] lg:flex-row">
                <div className="space-y-12 lg:space-y-6">
                    <div className="space-y-12 md:inline-flex md:gap-12 md:space-y-0">
                        <MeasureCard value={80} type="PPM" />
                        {dailyDistance !== null && (
                            <MeasureCard
                                value={dailyDistance}
                                type={dailyDistance < 1000 ? 'm' : 'km'}
                            />
                        )}
                    </div>

                    <AirQualityGraph />
                </div>

                <MonthlyObjective objective={20} />
            </div>
        </div>
    );
};

export default User;
