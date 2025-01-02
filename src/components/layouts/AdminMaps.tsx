import { useState } from 'react';
import { MapComponent } from './MapComponent';
import SelectDateBtn from '../common/SelectDateBtn';
import DatePicker from '../widgets/DatePicker';

export const AdminMaps = () => {
    const [showDatePicker, setShowDatePicker] = useState(true);

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setShowDatePicker(false);
    };

    return (
        <div className="relative">
            <h3>Mapas</h3>

            {/* Pass the toggleChooseDayPopUp function to SelectDateBtn */}
            <SelectDateBtn onClick={toggleDatePicker} />

            <MapComponent />

            {showDatePicker && (
                <DatePicker
                    onClose={() => setShowDatePicker(false)}
                    onSelect={handleDateSelect}
                />
            )}
        </div>
    );
};
