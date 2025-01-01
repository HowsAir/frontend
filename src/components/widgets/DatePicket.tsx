import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
    onClose: () => void;
    onSelect: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onClose, onSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Get today's date without time for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isCurrentMonth = (date: Date): boolean => {
        const now = new Date();
        return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        );
    };

    interface IsFutureMonth {
        (date: Date): boolean;
    }

    const isFutureMonth: IsFutureMonth = (date) => {
        const now = new Date();
        return (
            date > now &&
            (date.getMonth() > now.getMonth() ||
                date.getFullYear() > now.getFullYear())
        );
    };

    interface GetDaysInMonth {
        (date: Date): number;
    }

    const getDaysInMonth: GetDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    interface GetFirstDayOfMonth {
        (date: Date): number;
    }

    const getFirstDayOfMonth: GetFirstDayOfMonth = (date) => {
        const firstDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            1
        ).getDay();
        return firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start
    };

    const handlePrevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        );
    };

    const handleNextMonth = () => {
        if (
            !isFutureMonth(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            )
        ) {
            setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            );
        }
    };

    interface IsDateDisabled {
        (day: number): boolean;
    }

    const isDateDisabled: IsDateDisabled = (day) => {
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        return date > today;
    };

    interface HandleDateSelect {
        (day: number): void;
    }

    const handleDateSelect: HandleDateSelect = (day) => {
        if (!isDateDisabled(day)) {
            const selected = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
            );
            setSelectedDate(selected);
            onSelect && onSelect(selected);
        }
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDayOfMonth = getFirstDayOfMonth(currentDate);
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-10" />);
        }

        // Add buttons for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isDisabled = isDateDisabled(day);
            const isSelected =
                selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === currentDate.getMonth() &&
                selectedDate?.getFullYear() === currentDate.getFullYear();

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    disabled={isDisabled}
                    className={`h-10 w-10 rounded-lg text-sm transition-colors duration-500 ease-in-out ${isSelected ? 'bg-primary text-white' : 'hover:bg-sky-200'} ${isDisabled ? 'text-neutral-200 hover:bg-transparent' : ''}`}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[300px] rounded-lg bg-white p-4">
                <div className="mb-4 flex w-full items-center justify-between">
                    <button
                        onClick={handlePrevMonth}
                        className="bg-gray transition-colors duration-300 ease-in-out hover:bg-neutral-300 flex h-8 w-8 items-center justify-center rounded-lg"
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
                                className="bg-gray transition-colors duration-300 ease-in-out hover:bg-neutral-300 flex h-8 w-8 items-center justify-center rounded-lg"
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
                        )) && (
                        <div className="h-10 w-10" /> // Placeholder for spacing
                    )}
                </div>

                <div className="mb-4 grid w-full grid-cols-7 gap-0">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
                        <div
                            key={day}
                            className="flex h-10 items-center justify-center"
                        >
                            <p className="text-gray-600 text-sm font-medium">
                                {day}
                            </p>
                        </div>
                    ))}
                    {renderCalendarDays()}
                </div>

                <button
                    className="bg-gray hover:bg-neutral-300 h-10 w-full rounded-lg transition-colors duration-500"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default DatePicker;
