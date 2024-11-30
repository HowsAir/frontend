import ProgressBar from '../common/ProgressBar';

interface MonthlyObjectiveProps {
    objective: number;
    current: number | 0;
}

export const MonthlyObjective = ({
    objective,
    current,
}: MonthlyObjectiveProps) => {
    return (
        <div className="h-fit w-full">
            <h3 className="font-">
                <span className="text-2xl">Objetivo mensual: </span>
                {objective}km
            </h3>
            <ProgressBar
                progress={parseFloat((current / 1000).toFixed(1))}
                objective={objective}
            />

            <p className="mt-8 text-2xl">
                Completa el objetivo para escoger un premio
            </p>

            <div className="mt-4 w-full overflow-auto rounded-lg border-[1px] border-gray">
                <p className="border-b-[1px] border-gray bg-white p-4 text-xl">
                    Premios{' '}
                    <span className="rounded-full bg-sky-200 px-2 py-[2px] text-sm text-primary">
                        3 disponibles
                    </span>
                </p>
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b-[1px] border-gray bg-neutral-50 text-neutral-500">
                            <th className="px-4 py-2 font-normal">Premio</th>
                            <th className="px-4 py-2 font-normal">Ciudad</th>
                            <th className="px-4 py-2 font-normal">Fecha</th>
                            <th className="px-4 py-2 font-normal"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr className="border-b-[1px] border-gray">
                            <td className="p-4">
                                Descuento 20% Teatro Olimpia
                            </td>
                            <td className="p-4">Valencia</td>
                            <td className="p-4">12/11/2024</td>
                            <td className="p-4">
                                {' '}
                                <button className="btn-primary p-2 text-sm">
                                    Canjear
                                </button>
                            </td>
                        </tr>
                        <tr className="border-b-[1px] border-gray">
                            <td className="p-4">Entrada al cine</td>
                            <td className="p-4">Valencia</td>
                            <td className="p-4">05/12/2024</td>
                            <td className="p-4">
                                <button className="btn-primary p-2 text-sm">
                                    Canjear
                                </button>
                            </td>
                        </tr>
                        <tr className="border-b-[1px] border-gray">
                            <td className="p-4">Entrada al cine</td>
                            <td className="p-4">Valencia</td>
                            <td className="p-4">05/12/2024</td>
                            <td className="p-4">
                                <button className="btn-primary p-2 text-sm">
                                    Canjear
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
