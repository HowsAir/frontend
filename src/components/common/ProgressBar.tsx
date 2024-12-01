import React from 'react';

interface ProgressBarProps {
    progress: number;
    objective: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, objective }) => {
    const percentage = Math.round((progress / objective) * 100);
    const padding = 100 - percentage;
    return (
        <div className="w-full">
            <p
                className="w-full text-end text-base font-light"
                style={{
                    paddingRight: `${padding}%`,
                    transition: 'padding-right 0.3s ease',
                }}
            >
                {progress}km
            </p>
            <div className='flex'>
                <div className="h-6 w-full rounded-full bg-sky-200">
                    <div
                        className="h-6 rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                    <p className="ml-4 text-start text-base font-light">{percentage}%</p>
            </div>
        </div>
    );
};

export default ProgressBar;
