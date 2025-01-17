import { useState } from 'react';
import { MapComponent } from '../../components/layouts/MapComponent';
import SelectDateBtn from '../../components/common/SelectDateBtn';
import DatePicker from '../../components/widgets/DatePicker';
import { getHistoricalAirQualityMap } from '../../api/apiClient';
import type { AirQualityMap } from '../../api/data';

const AdminMaps = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mapData, setMapData] = useState<AirQualityMap | null>(null);

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleDateSelect = async (timestamp: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getHistoricalAirQualityMap(timestamp);
            if (!data) {
                throw new Error('No data received');
            }
            setMapData(data);
        } catch (err) {
            setError('Error fetching map data');
            console.error('Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="px-24 relative -top-10">
            <div className='inline-flex'>
                <h3>{`Mapas:`}</h3>
                {isLoading && <div>Cargando...</div>}
                {error && <div className="text-red-500">{error}</div>}
                {}
            </div>

            <MapComponent data={mapData} />
            <SelectDateBtn onClick={toggleDatePicker} />
            {showDatePicker && (
                <DatePicker
                    onClose={() => setShowDatePicker(false)}
                    onSelect={handleDateSelect}
                />
            )}
        </div>
    );
};

export default AdminMaps;
