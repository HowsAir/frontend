import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { getFormattedDate } from '../../utils/DateFormatter';

interface DatePickerProps {
    onClose: () => void;
    onSelect: (dateTime: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onClose, onSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [step, setStep] = useState<'date' | 'time'>('date');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

    // Generate available hours (9:00 - 17:00)
    const availableHours = Array.from({ length: 9 }, (_, i) => {
        const hour = i + 9;
        return `${hour.toString().padStart(2, '0')}:00`;
    });

    // All the existing date picker functions remain the same
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isCurrentMonth = (date: Date): boolean => {
        const now = new Date();
        return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        );
    };

    const isFutureMonth = (date: Date): boolean => {
        const now = new Date();
        return (
            date > now &&
            (date.getMonth() > now.getMonth() ||
                date.getFullYear() > now.getFullYear())
        );
    };

    const getDaysInMonth = (date: Date): number => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date): number => {
        const firstDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            1
        ).getDay();
        return firstDay === 0 ? 6 : firstDay - 1;
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

    const isDateDisabled = (day: number): boolean => {
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
        );
        return date > today;
    };

    const handleDateSelect = (day: number) => {
        if (!isDateDisabled(day)) {
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

    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            const [hours] = selectedTime.split(':').map(Number);
            const finalDate = new Date(selectedDate);
            finalDate.setHours(hours, 0, 0, 0);
            onSelect(finalDate);
        }
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDayOfMonth = getFirstDayOfMonth(currentDate);
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-10" />);
        }

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

    if (step === 'time' && selectedDate) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-[300px] rounded-lg bg-white p-4">
                    <p className="mb-4 text-left text-base font-medium">
                        Elegiste el día
                        {getFormattedDate(
                            selectedDate.toISOString(),
                            'compact',
                            true
                        )}
                    </p>

                    <p className="mb-2">Elige una hora disponible</p>

                    <div className="relative mb-8">
                        <button
                            onClick={() =>
                                setIsTimeDropdownOpen(!isTimeDropdownOpen)
                            }
                            className="flex w-full items-center justify-between rounded-lg border-[1px] border-gray bg-offwhite px-2 py-0.5 text-left text-neutral-600 transition-colors duration-300 hover:bg-gray"
                        >
                            <span>{selectedTime || 'Seleccionar hora'}</span>
                            <ChevronDown className="h-5 w-5" />
                        </button>

                        {isTimeDropdownOpen && (
                            <div className="border-gray-200 absolute mt-1 max-h-48 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
                                {availableHours.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelect(time)}
                                        className="w-full p-2 text-left transition-colors hover:bg-sky-200"
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleConfirm}
                        disabled={!selectedTime}
                        className="mb-2 w-full rounded-lg bg-primary py-1.5 text-white transition-colors duration-300 disabled:bg-gray"
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="h-[400px] w-[300px] rounded-lg bg-white p-4 flex flex-col justify-between">
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
