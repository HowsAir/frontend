import { useState } from 'react';
import { MapComponent } from './MapComponent';
import SelectDateBtn from '../common/SelectDateBtn';
import DatePicker from '../widgets/DatePicker';
import { getHistoricalAirQualityMap } from '../../api/apiClient';
import type { AirQualityMap } from '../../api/data';

export const AdminMaps = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mapData, setMapData] = useState<AirQualityMap | null>(null);

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleDateSelect = async (timestamp: string) => {
        console.log(timestamp);
        setIsLoading(true);
        setError(null);
        try {
            const data = await getHistoricalAirQualityMap(timestamp);
            setMapData(data);
        } catch (err) {
            setError('Error fetching map data');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <h3>{`Mapas:`}</h3>

            <SelectDateBtn onClick={toggleDatePicker} />

            {isLoading && <div>Cargando...</div>}
            {!isLoading && mapData && <p>Fecha seleccionada: {new Date(mapData.timestamp).toLocaleDateString()}</p>}
            {error && <div className="text-red-500">{error}</div>}
            {}

            <MapComponent  />

            {showDatePicker && (
                <DatePicker
                    onClose={() => setShowDatePicker(false)}
                    onSelect={handleDateSelect}
                />
            )}
        </div>
    );
};
