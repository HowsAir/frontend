export interface MeasurementData {
    id: string;
    timestamp: Date;
    o3Value: number;
    no2Value: number;
    coValue: number;
    latitude: number;
    longitude: number;
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