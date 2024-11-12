import { AirQualityGraph } from '../components/widgets/AirQualityGraph';
import { MeasureCard } from '../components/widgets/MeasureCard';
import { MonthlyObjective } from '../components/widgets/MonthlyObjective.tsx';

const User = () => {
    return (
        <div className="mx-auto w-fit lg:mx-24">
            <h3 className="mx-auto mb-10 lg:mx-0">Tu nodo hoy</h3>

            <div className="flex flex-col gap-12 lg:flex-row">
                <div className="space-y-12 lg:space-y-6">
                    <div className="space-y-12 md:space-y-0 md:gap-12 md:inline-flex">
                        <MeasureCard />
                        <MeasureCard />
                    </div>

                    <AirQualityGraph />
                </div>
                
                <MonthlyObjective />
            </div>
        </div>
    );
};

export default User;
