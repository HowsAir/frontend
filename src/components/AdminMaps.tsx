import { useState } from 'react';
import { ChooseDayPopUp } from './widgets/ChooseDayPopUp';
import { MapComponent } from './MapComponent';
import SelectDateBtn from './common/SelectDateBtn';

export const AdminMaps = () => {
    const [chooseDayPopUp, setChooseDayPopUp] = useState<boolean>(false);

    const toggleChooseDayPopUp = () => {
        setChooseDayPopUp(!chooseDayPopUp);
    };

    return (
        <div className="relative">
            <h3>Mapas</h3>

            {/* Pass the toggleChooseDayPopUp function to SelectDateBtn */}
            <SelectDateBtn onClick={toggleChooseDayPopUp} />

            <MapComponent />

            {chooseDayPopUp && (
                <ChooseDayPopUp togglePopup={toggleChooseDayPopUp} />
            )}
        </div>
    );
};
