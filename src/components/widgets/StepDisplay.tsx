import React from 'react';

export const StepDisplay = ({
    total,
    current,
    steps,
}: {
    total: number;
    current: number;
    steps: React.FC<{ color: string }>[];
}) => {
    return (
        <div className="fixed left-1/2 top-20 z-[1000] mb-6 flex w-fit -translate-x-1/2 items-center justify-center rounded-b-3xl bg-white px-3 py-2 drop-shadow-header">
            {Array.from({ length: total }).map((_, index) => {
                const StepIcon = steps[index]; // Get the icon for the current step
                const isActive = index < current; // Check if the step is active

                return (
                    <React.Fragment key={index}>
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-2xl ${
                                isActive ? 'bg-primary' : 'bg-gray'
                            }`}
                        >
                            {/* Render the step icon with the appropriate color */}
                            {StepIcon && (
                                <StepIcon
                                    color={isActive ? '#FFFFFF' : '#1074E7'}
                                />
                            )}
                        </div>

                        {index < total - 1 && (
                            <div
                                className={`mx-2 h-[1px] w-20 rounded-full border-2 ${
                                    index + 1 < current
                                        ? 'border-primary'
                                        : 'border-gray'
                                }`}
                                key={`divider-${index}`}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
