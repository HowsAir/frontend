import React, { useEffect, useRef, useState } from 'react';

interface GradientSliderProps {
    value: null | number;
}

export const GradientSlider: React.FC<GradientSliderProps> = ({ value }) => {
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
        if (value !== null) {
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
        }
    }, [value]);

    return (
        <div className={`inline-flex gap-2 ${value != null ? '' : 'opacity-0'}`}>
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
    );
}