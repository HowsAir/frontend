import React from 'react';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const padding = 100 - progress;
    return (
        <div className='w-full'>
            <p
                className="w-full text-base font-light text-end"
                style={{
                    paddingRight: `${padding}%`,
                    transition: 'padding-right 0.3s ease',
                }}
            >
                {progress}%
            </p>
            <div className="h-6 w-full rounded-full bg-sky-200">
                <div
                    className="h-6 rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
