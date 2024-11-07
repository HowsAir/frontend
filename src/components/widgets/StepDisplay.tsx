export const StepDisplay = ({
    total,
    current,
}: {
    total: number;
    current: number;
}) => {
    return (
        <div className="absolute top-28 mb-6 flex w-full items-center justify-center">
            {Array.from({ length: total }).map((_, index) => (
                <>
                    <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-2xl ${index + 1 <= current ? 'bg-primary text-offwhite' : 'bg-gray text-primary'}`}
                        key={index}
                    >
                        {index + 1}
                    </div>

                    {index < total - 1 && (
                        <div
                            className={`mx-2 h-[1px] w-20 rounded-full border-2 ${index + 1 < current ? 'border-primary' : 'border-gray'}`}
                            key={`divider-${index}`}
                        />
                    )}
                </>
            ))}
        </div>
    );
};
