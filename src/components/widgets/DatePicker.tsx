import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { getCalendarMetadata } from '../../api/apiClient';
import type { CalendarMetadataOutput } from '../../api/data';
import { getFormattedDate } from '../../utils/DateFormatter';

interface DatePickerProps {
    onClose: () => void;
    onSelect: (selectedISODate: string) => void;
}

const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

const DatePicker: React.FC<DatePickerProps> = ({ onClose, onSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [step, setStep] = useState<'date' | 'time'>('date');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    const [calendarData, setCalendarData] =
        useState<CalendarMetadataOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch calendar metadata when month changes
    useEffect(() => {
        const fetchCalendarData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getCalendarMetadata(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1
                );
                console.log(response);
                setCalendarData(response);
            } catch (err) {
                setError('Error loading calendar data');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCalendarData();
    }, [currentDate]);

    const isDateAvailable = (day: number): boolean => {
        if (!calendarData) return false;
        const dateStr = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        )
            .toISOString()
            .split('T')[0];

        return calendarData.availableDates.some(
            (d) => d.date.split('T')[0] === dateStr
        );
    };

    const getAvailableTimesForDate = (date: Date): string[] => {
        if (!calendarData) return [];

        const dateStr = date.toISOString().split('T')[0];
        const dateData = calendarData.availableDates.find(
            (d) => d.date.split('T')[0] === dateStr
        );

        return dateData ? dateData.times.flat() : [];
    };

    const isCurrentMonth = (date: Date): boolean => {
        const today = new Date();
        return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth()
        );
    };

    const isFutureMonth = (date: Date): boolean => {
        const today = new Date();
        return (
            date.getFullYear() > today.getFullYear() ||
            (date.getFullYear() === today.getFullYear() &&
                date.getMonth() > today.getMonth())
        );
    };

    const handlePrevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        );
    };

    const handleNextMonth = () => {
        if (
            calendarData &&
            currentDate.getFullYear() <= calendarData.firstAvailableYear
        ) {
            setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            );
        }
    };

    const handleDateSelect = (day: number) => {
        if (isDateAvailable(day)) {
            const selected = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
            );
            setSelectedDate(selected);
            setStep('time');
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setIsTimeDropdownOpen(false);
    };

    const handleConfirm = async () => {
        if (selectedDate && selectedTime) {
            // Extract the date and time from the available times and combine them to get the full ISO string
            const selectedDateTime = new Date(
                `${selectedDate.toISOString().split('T')[0]}T${selectedTime}`
            ).toISOString();
            console.log(selectedDateTime);
            
            onSelect(selectedDateTime); // Send the properly formatted timestamp
            onClose();
        }
    };

    const renderCalendarDays = () => {
        const daysInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();

        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        ).getDay();

        const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const days = [];

        for (let i = 0; i < firstDayIndex; i++) {
            days.push(<div key={`empty-${i}`} className="h-10" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isAvailable = isDateAvailable(day);
            const isSelected =
                selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === currentDate.getMonth() &&
                selectedDate?.getFullYear() === currentDate.getFullYear();

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    disabled={!isAvailable}
                    className={`h-10 w-10 rounded-lg text-sm transition-colors duration-500 ease-in-out ${
                        isSelected
                            ? 'bg-primary text-white'
                            : 'hover:bg-sky-200'
                    } ${
                        !isAvailable
                            ? 'cursor-not-allowed text-neutral-200 hover:bg-transparent'
                            : ''
                    }`}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="h-[400px] w-[300px] rounded-lg bg-white p-20 py-32 text-center">
                    <img
                        alt="Cargando..."
                        src="https://media.tenor.com/G7LfW0O5qb8AAAAj/loading-gif.gif"
                        className="m-auto size-20"
                    />
                </div>
            </div>
        );
    }

    if (step === 'time' && selectedDate) {
        const availableTimes = getAvailableTimesForDate(selectedDate);

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-[300px] rounded-lg bg-white p-4">
                    <h2 className="mb-4 text-left text-base font-medium">
                        Elegiste el día
                        {getFormattedDate(
                            selectedDate.toISOString(),
                            'compact',
                            true
                        )}
                    </h2>

                    <p className="mb-2">Elige una hora disponible</p>

                    <div className="relative mb-8">
                        <button
                            onClick={() =>
                                setIsTimeDropdownOpen(!isTimeDropdownOpen)
                            }
                            className="flex w-full items-center justify-between rounded-lg border-[1px] border-gray bg-white px-2 py-0.5 text-left text-neutral-600 transition-colors duration-300 hover:bg-gray"
                        >
                            <span>
                                {selectedTime.slice(0, 5) || 'Seleccionar hora'}
                            </span>
                            <ChevronDown className="h-5 w-5" />
                        </button>

                        {isTimeDropdownOpen && (
                            <div className="border-gray-200 absolute mt-1 max-h-48 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
                                {availableTimes.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelect(time)}
                                        className="w-full p-2 text-left transition-colors hover:bg-sky-200"
                                    >
                                        {time.slice(0, 5)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {error && (
                        <p className="mb-2 text-center text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleConfirm}
                        disabled={!selectedTime}
                        className="mb-2 w-full rounded-lg bg-primary py-1.5 text-white transition-colors duration-300 disabled:bg-neutral-300"
                    >
                        Confirmar
                    </button>

                    <button
                        className="w-full rounded-lg bg-gray py-1.5 transition-colors duration-300 hover:bg-neutral-300"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        );
    }

    // Rest of the component remains the same
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex h-[400px] w-[300px] flex-col justify-between rounded-lg bg-white p-4">
                <>
                    <div className="mb-4 flex w-full items-center justify-between">
                        <button
                            onClick={handlePrevMonth}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray transition-colors duration-300 ease-in-out hover:bg-neutral-300"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <p className="font-medium">
                            {monthNames[currentDate.getMonth()]}{' '}
                            {currentDate.getFullYear()}
                        </p>
                        {!isCurrentMonth(currentDate) &&
                            !isFutureMonth(
                                new Date(
                                    currentDate.getFullYear(),
                                    currentDate.getMonth() + 1
                                )
                            ) && (
                                <button
                                    onClick={handleNextMonth}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray transition-colors duration-300 ease-in-out hover:bg-neutral-300"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            )}
                        {(isCurrentMonth(currentDate) ||
                            isFutureMonth(
                                new Date(
                                    currentDate.getFullYear(),
                                    currentDate.getMonth() + 1
                                )
                            )) && <div className="h-8 w-8" />}
                    </div>

                    <div className="mb-auto grid w-full grid-cols-7 gap-0">
                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
                            <div
                                key={day}
                                className="flex h-10 items-center justify-center"
                            >
                                <p className="text-base font-medium text-primary">
                                    {day}
                                </p>
                            </div>
                        ))}
                        {renderCalendarDays()}
                    </div>
                </>

                <button
                    className="w-full rounded-lg bg-gray py-2 transition-colors duration-500 hover:bg-neutral-300"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default DatePicker;
