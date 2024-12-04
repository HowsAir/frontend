import React, { useEffect, useRef, useState } from 'react';
import { GradientSlider } from './GradientSlider';
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
                    return '#EAB308';
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
                        {title}
                        <button
                            className={`${slider ? 'relative top-[2px] pl-1' : 'hidden'} `}
                        >
                            <img
                                alt="info"
                                src="../../../public/icons/info.svg"
                            />
                        </button>
                    </p>
                    <label className="text-lg font-normal leading-none">
                        {date}
                    </label>
                </div>
                <div
                    className={`flex flex-col items-center ${average == null ? 'hidden' : ''}`}
                >
                    <p className="text-base font-light text-neutral-500">
                        Media hoy
                    </p>
                    <img
                        className="size-6"
                        alt="Img media"
                        src={overallQuality.icon}
                    ></img>
                    <p
                        className="-mt-1 text-base"
                        style={{ color: overallQuality.color }}
                    >
                        {average}
                    </p>
                </div>
            </div>
            <h1 className="m-auto flex w-fit text-offblack mb-2">
                {value}
                <p className="mb-2.5 ml-1 mt-auto text-3xl">{type}</p>
            </h1>
            <GradientSlider value={value} visible={slider} />
        </div>
    );
};
