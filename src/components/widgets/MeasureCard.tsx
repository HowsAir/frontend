import React, { useEffect, useRef, useState } from 'react';
const goodQualityIcon = '../../../public/icons/good-quality.svg';
const regularQualityIcon = '../../../public/icons/regular-quality.svg';
const toxicQualityIcon = '../../../public/icons/toxic-quality.svg';

interface MeasureCardProps {
    value: number;
    date: string;
    title: string;
    type?: string;
    slider?: boolean;
    average?: string | null;
}

export const MeasureCard: React.FC<MeasureCardProps> = ({
    value,
    date,
    type,
    slider,
    title,
    average,
}) => {
    const [color, setColor] = useState('green');
    const gradientRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Custom gradient stops
        const gradientColors = [
            { stop: 0, color: 'rgb(22, 163, 74)' }, // Green
            { stop: 50, color: 'rgb(234, 179, 8)' }, // Yellow
            { stop: 100, color: 'rgb(220, 38, 38)' }, // Red
        ];

        // Interpolate the color based on the value
        for (let i = 0; i < gradientColors.length - 1; i++) {
            const start = gradientColors[i];
            const end = gradientColors[i + 1];
            if (value >= start.stop && value <= end.stop) {
                const ratio = (value - start.stop) / (end.stop - start.stop);
                const interpolateColor = (
                    startValue: number,
                    endValue: number
                ) => Math.round(startValue + ratio * (endValue - startValue));

                const [r1, g1, b1] = start.color.match(/\d+/g)!.map(Number);
                const [r2, g2, b2] = end.color.match(/\d+/g)!.map(Number);

                setColor(
                    `rgb(${interpolateColor(r1, r2)}, ${interpolateColor(g1, g2)}, ${interpolateColor(b1, b2)})`
                );
                break;
            }
        }
    }, [value]);

    const overallQuality = {
        icon: (() => {
            switch (average) {
                case 'Buena':
                    return goodQualityIcon;
                case 'Regular':
                    return regularQualityIcon;
                case 'Peligrosa':
                    return toxicQualityIcon;
                default:
                    return;
            }
        })(),
        color: (() => {
            switch (average) {
                case 'Buena':
                    return '#49B500';
                case 'Regular':
                    return '#e6d200';
                case 'Peligrosa':
                    return '#E10000';
                default:
                    return;
            }
        })(),
    };
    
    return (
        <div className="flex min-h-52 w-fit min-w-80 flex-col rounded-lg border-[1px] border-gray bg-white px-6 py-4">
            <div className="inline-flex justify-between">
                <div className="flex flex-col">
                    <p className="text-lg font-medium">
                        {title}{'  '}
                        <button className="size-6 rounded-md bg-gray">i</button>
                    </p>
                    <label className="text-lg font-normal leading-none">
                        {date}
                    </label>
                </div>
                <div className={`flex flex-col items-center ${average == null ? 'hidden' : ''}`}>
                    <p className="text-base text-neutral-500 font-light">Media hoy</p>
                    <img
                        className="size-6"
                        alt="Img media"
                        src={overallQuality.icon}
                    ></img>
                    <p className='text-base -mt-1' style={{ color: overallQuality.color }}>{average}</p>
                </div>
            </div>
            <h1 className="m-auto flex w-fit text-offblack">
                {value}
                <p className="mb-2.5 ml-1 mt-auto text-3xl">{type}</p>
            </h1>
            <div className={`inline-flex gap-2 ${slider ? '' : 'opacity-0'}`}>
                0
                <div
                    ref={gradientRef}
                    className="relative mx-auto my-2 h-1.5 w-full rounded-full bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"
                >
                    <div
                        className="absolute -top-[9px] size-6 -translate-x-2 rounded-full border-2 border-white transition-all duration-500"
                        style={{
                            left: `${value}%`,
                            backgroundColor: color,
                        }}
                    ></div>
                </div>
                100
            </div>
        </div>
    );
};
