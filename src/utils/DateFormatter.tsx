// DateFormatter.tsx
export const getFormattedDate = (daysToAdd?: number): string => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + (daysToAdd ?? 0));

    const monthNames = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
    ];

    const day = futureDate.getDate();
    const month = monthNames[futureDate.getMonth()];
    const year = futureDate.getFullYear();

    return `${day} de ${month} de ${year}`;
};
