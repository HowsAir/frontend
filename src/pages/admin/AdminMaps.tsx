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
        <div className="relative -top-10 px-24">
            <div className="inline-flex items-center gap-x-4">
                <h3>{`Mapas:`}</h3>
                {isLoading &&
                    <div className='inline-flex gap-1 items-center'>
                        <img
                            alt="Cargando..."
                            src="https://media.tenor.com/G7LfW0O5qb8AAAAj/loading-gif.gif"
                            className="size-5"
                        />
                        Cargando...
                    </div>
                }
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
