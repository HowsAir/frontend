import React from 'react';
import { MeasurementData } from '../api/data';

const Medicion: React.FC<MeasurementData> = ({
    timestamp,
    o3Value,
    no2Value,
    coValue,
    latitude,
    longitude,
}) => {
    return (
        <div className="p-4 rounded-lg shadow-sm bg-gray-50">
            <p>
                <strong>Fecha:</strong> {new Date(timestamp).toLocaleString()}
            </p>
            <p>
                <strong>O3 PPM:</strong> {o3Value}
            </p>
            <p>
                <strong>NO2 PPM:</strong> {no2Value}
            </p>
            <p>
                <strong>CO PPM:</strong> {coValue}
            </p>
            <p>
                <strong>Latitud:</strong> {latitude}
            </p>
            <p>
                <strong>Longitud:</strong> {longitude}
            </p>
        </div>
    );
};

export default Medicion;
