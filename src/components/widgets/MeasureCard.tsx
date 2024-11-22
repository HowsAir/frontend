interface MeasureCardProps {
    value: number;
    type: string;
}

export const MeasureCard: React.FC<MeasureCardProps> = ({ value, type }) => {
    return (
        <div className="w-fit min-w-80 min-h-52 py-4 px-6  rounded-lg border-[1px] border-gray bg-white flex flex-col">
            <div className="inline-flex gap-2">
                <div
                    className="size-4 rounded-md bg-red-500 mt-[6px]"
                    id="measure-color"
                ></div>
                <div className="flex flex-col">
                    <p className="text-lg font-medium" id="title">
                        {type === 'PPM' ? 'Ultima medición' : 'Recorrido'}
                    </p>
                    <label
                        className="leading-none text-lg font-normal text-neutral-500"
                        id="time"
                    >
                        Hace 20 min.
                    </label>
                </div>
            </div>
            <h1 className="m-auto text-offblack flex w-fit">
                {value}
                <h3 className="mt-auto mb-3 ml-1">{type}</h3>
            </h1>
        </div>
    );
};
