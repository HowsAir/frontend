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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const colors = {
    red: '#E37070',
    yellow: '#EBE34E',
    green: '#A2D481',
};

export const AirQualityGraph = () => {
    // const [data, setData] = useState([]);
    const data = [
        { hour: '1:00', value: 15 },
        { hour: '2:00', value: 45 },
        { hour: '3:00', value: 68 },
        { hour: '4:00', value: 72 },
        { hour: '5:00', value: 88 },
        { hour: '6:00', value: 55 },
        { hour: '7:00', value: 43 },
        { hour: '8:00', value: 22 },
        { hour: '9:00', value: 76 },
        { hour: '10:00', value: 54 },
        { hour: '11:00', value: 35 },
        { hour: '12:00', value: 90 },
    ];

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('/api/get-hourly-averages');
    //         const result = await response.json();
    //         setData(result);
    //     }
    //     fetchData();
    // }, []);

    const getColor = (value: number) => {
        if (value > 80) return colors.red; // Bad (red)
        if (value > 50) return colors.yellow; // Medium (yellow)
        return colors.green; // Good (green)
    };

    const chartData = {
        labels: Array(12)
            .fill('')
            .map((_, i) => `Hora ${i + 1}`),
        datasets: [
            {
                label: 'Media',
                data: data.map((entry) => entry.value),
                backgroundColor: data.map((entry) => getColor(entry.value)),
                borderColor: data.map((entry) => getColor(entry.value)),
                borderWidth: 1,
                borderRadius: { topLeft: 8, topRight: 8 },
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            y: { display: false },
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
            <div className="mb-2 flex justify-between">
                <h2 className="mb-0 text-lg">Calidad del aire</h2>
                <div className="flex gap-2 align-top">
                    <div className="flex items-center">
                        <span
                            className="mr-1 inline-block h-3 w-3"
                            style={{ backgroundColor: colors.green }}
                        ></span>
                        <span className="text-sm">Good</span>
                    </div>
                    <div className="flex items-center">
                        <span
                            className="mr-1 inline-block h-3 w-3"
                            style={{ backgroundColor: colors.yellow }}
                        ></span>
                        <span className="text-sm">Medium</span>
                    </div>
                    <div className="flex items-center">
                        <span
                            className="mr-1 inline-block h-3 w-3"
                            style={{ backgroundColor: colors.red }}
                        ></span>
                        <span className="text-sm">Bad</span>
                    </div>
                </div>
            </div>
            <div className="h-[75%]">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};
