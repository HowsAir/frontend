import React, { useState } from 'react';
import { GradientSlider } from './GradientSlider';
import { GasInfoPopUp } from './GasInfoPopUp';
const goodQualityIcon = '../../../public/icons/good-quality.svg';
const regularQualityIcon = '../../../public/icons/regular-quality.svg';
const toxicQualityIcon = '../../../public/icons/toxic-quality.svg';

interface MeasureCardProps {
    value: number;
    date: string;
    title: string;
    type?: string;
    slider?: null | number;
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
    

    const [gasInfoPopUp, setGasInfoPopUp] = useState<boolean>(false);
    const toggleGasInfoPopUp = () => {
        setGasInfoPopUp(!gasInfoPopUp);
    };

    return (
        <div className="flex min-h-52 w-fit min-w-80 flex-col rounded-lg border-[1px] border-gray bg-white px-6 py-4">
            <div className="inline-flex justify-between">
                <div className="flex flex-col">
                    <p className="text-lg font-medium">{title}</p>
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
            <h1 className="m-auto mb-2 flex w-fit text-offblack">
                {value}
                <p className="mb-2.5 ml-1 mt-auto text-right text-3xl leading-none">
                    {type === 'm' || type === 'km' ? (
                        type
                    ) : (
                        <>
                            <span className="text-base leading-none text-neutral-600">
                                {type}
                                <button
                                    className="relative top-[2px] size-5 pl-1"
                                    onClick={toggleGasInfoPopUp}
                                >
                                    <img
                                        alt="info"
                                        src="../../../public/icons/help.svg"
                                    />
                                </button>
                            </span>
                            <br />
                            ppm{' '}
                        </>
                    )}
                </p>
            </h1>
            <GradientSlider value={slider ?? null} />
            {gasInfoPopUp && <GasInfoPopUp togglePopup={toggleGasInfoPopUp} />}
        </div>
    );
};
