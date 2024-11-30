interface MeasureCardProps {
    value: number;
    type: string;
}

export const MeasureCard: React.FC<MeasureCardProps> = ({ value, type }) => {
    return (
        <div className="flex min-h-52 w-fit min-w-80 flex-col rounded-lg border-[1px] border-gray bg-white px-6 py-4">
            <div className="inline-flex gap-2">
                <div
                    className="color-blue mt-[6px] size-4 rounded-md bg-primary"
                    id="measure-color"
                ></div>
                <div className="flex flex-col">
                    <p className="text-lg font-medium" id="title">
                        {type === 'PPM' ? 'Ultima medición' : 'Recorrido'}
                    </p>
                    <label
                        className="text-lg font-normal leading-none text-neutral-500"
                        id="time"
                    >
                        Ahora
                    </label>
                </div>
            </div>
            <h1 className="m-auto flex w-fit text-offblack">
                {value}
                <h3 className="mb-3 ml-1 mt-auto">{type}</h3>
            </h1>
        </div>
    );
};
