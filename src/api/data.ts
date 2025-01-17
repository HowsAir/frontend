export interface MeasurementData {
    id: string;
    timestamp: Date;
    o3Value: number;
    no2Value: number;
    coValue: number;
    latitude: number;
    longitude: number;
}

export interface AirQualityMap {
    url: string;
    timestamp: string;
}

export interface UserStatistics {
    id: number;
    name: string;
    surnames: string;
    phone: string;
    nodeId: number;
    averageDailyActiveHours: number;
    averageDailyDistance: number;
    nodeLastConnection: string;
}

export interface UserProfile {
    id: number;
    email: string;
    name: string;
    surnames: string;
    password: string;
    photoUrl: string;
    phone: string;
    country: string;
    city: string;
    zipCode: string;
    address: string;
    roleId: number;
}

export interface DashboardData {
    lastAirQualityReading: {
        timestamp: string;
        airQuality: string;
        proportionalValue: number;
        gas: string;
        ppmValue: number;
    };
    todayDistance: number;
    airQualityReadingsInfo: {
        airQualityReadings: {
            timestamp: string;
            airQuality: string;
            proportionalValue: number;
            gas: string;
            ppmValue: number;
        }[];
        overallAirQuality: string;
    };
}

export interface CalendarMetadataOutput {
    firstAvailableYear: number;
    year: number;
    month: number;
    availableDates: {
        date: string;
        times: string[][];
    }[];
}
