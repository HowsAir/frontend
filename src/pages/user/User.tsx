import { AirQualityGraph } from '../../components/widgets/AirQualityGraph';
import { MeasureCard } from '../../components/widgets/MeasureCard';
import { MonthlyObjective } from '../../components/widgets/MonthlyObjective.tsx';

const User = () => {
    return (
        <div className="mx-auto w-fit lg:w-full lg:px-24">
            <h3 className="mx-auto mb-10 lg:mx-0">Tu nodo hoy</h3>

            <div className="flex flex-col gap-12 lg:max-h-[60dvh] lg:flex-row">
                <div className="space-y-12 lg:space-y-6">
                    <div className="space-y-12 md:inline-flex md:gap-12 md:space-y-0">
                        <MeasureCard value={80} type="PPM" />
                        <MeasureCard value={30} type="m" />
                    </div>

                    <AirQualityGraph />
                </div>

                <MonthlyObjective objective={20} />
            </div>
        </div>
    );
};

export default User;
