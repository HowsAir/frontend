import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Measurement } from '../../types/mainTypes'; // Import the Measurement interface

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const colors = {
    good: '#49B500', // Green for Good
    regular: '#EAB308', // Yellow for Regular
    dangerous: '#E10000', // Red for Dangerous
};

// Define thresholds
const thresholds = {
    good: { min: 0, max: 20 },
    regular: { min: 21, max: 60 },
    dangerous: { min: 61, max: 100 },
};

interface AirQualityGraphProps {
    measurements: Measurement[]; // Use the imported Measurement interface
}

export const AirQualityGraph = ({ measurements }: AirQualityGraphProps) => {
    // Function to get the color based on the value
    const getColor = (value: number) => {
        if (value <= thresholds.good.max) return colors.good; // Good (Green)
        if (value <= thresholds.regular.max) return colors.regular; // Regular (Yellow)
        return colors.dangerous; // Dangerous (Red)
    };

    // Chart Data Preparation
    const chartData = {
        labels: measurements.map((entry) => {
            const date = new Date(entry.timestamp);
            return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }),
        datasets: [
            {
                label: 'Air Quality',
                data: measurements.map((entry) => entry.proportionalValue),
                backgroundColor: measurements.map((entry) =>
                    getColor(entry.proportionalValue)
                ),
                borderColor: measurements.map((entry) =>
                    getColor(entry.proportionalValue)
                ),
                borderWidth: 1,
                borderRadius: { topLeft: 8, topRight: 8 },
            },
        ],
    };

    // Chart Options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            y: {
                min: 0, // Set the minimum value of Y-axis to 0
                max: 100, // Set the maximum value of Y-axis to 100
                ticks: {
                    stepSize: 20,
                    callback: function (value: string | number) {
                        if (value === thresholds.good.max) {
                            return 'Buena';
                        }
                        if (value === thresholds.regular.max) {
                            return 'Regular';
                        }
                        if (value === thresholds.dangerous.max) {
                            return 'Peligrosa';
                        }
                        return null;
                    },
                },
                grid: {
                    drawBorder: false,
                    color: 'rgba(0, 0, 0, 0.1)',
                    borderDash: [5, 5], 
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    autoSkip: true,
                    maxRotation: 0,
                },
            },
        },
    };


    return (
        <div className="h-auto w-full rounded-lg border-[1px] border-gray bg-white px-8 pb-0 pt-4 lg:h-[51%]">
            <div className="mb- flex justify-between">
                <h2 className="mb-0 text-lg">Calidad del aire</h2>                
                <div className="flex gap-2 align-top">
                    <div className="flex items-center">
                        <span
                            className="mr-1 inline-block h-3 w-3 rounded-[5px]"
                            style={{ backgroundColor: colors.good }}
                        ></span>
                        <span className="text-sm">Buena</span>
                    </div>
                    <div className="flex items-center">
                        <span
                            className="mr-1 inline-block h-3 w-3 rounded-[5px]"
                            style={{ backgroundColor: colors.regular }}
                        ></span>
                        <span className="text-sm">Regular</span>
                    </div>
                    <div className="flex items-center">
                        <span
                            className="mr-1 inline-block h-3 w-3 rounded-[5px]"
                            style={{ backgroundColor: colors.dangerous }}
                        ></span>
                        <span className="text-sm">Peligrosa</span>
                    </div>
                </div>
            </div>
            <p className='text-sm text-neutral-600 mb-2'></p>
            <div className="h-[75%]">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};
