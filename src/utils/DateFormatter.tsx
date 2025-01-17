export const getFormattedDate = (
    inputDate?: string, // ISO timestamp
    format: 'fancy' | 'compact' | 'compactDayFirst' | 'relative' = 'fancy', // Format of the output
    noTime?: boolean, // if true, time will not be included in the output
    compareToDate?: string, // specify the date to compare against
): string => {
    const baseDate = inputDate ? new Date(inputDate) : new Date(); // Parse input date or use today's date
    if (isNaN(baseDate.getTime())) {
        throw new Error(
            'Invalid input date format. Please use a valid ISO timestamp.'
        );
    }

    const compareDate = compareToDate ? new Date(compareToDate) : new Date(); // Date to compare against
    if (isNaN(compareDate.getTime())) {
        throw new Error(
            'Invalid compareToDate format. Please use a valid ISO timestamp.'
        );
    }

    if (format === 'relative') {
        const diffInSeconds = Math.floor(
            (compareDate.getTime() - baseDate.getTime()) / 1000
        ); // Difference in seconds

        if (diffInSeconds < 60) return `Hace ${diffInSeconds} segundos`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `Hace ${diffInMinutes} minutos`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `Hace ${diffInHours} horas`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `Hace ${diffInDays} días`;
    }

    if (format === 'compact') {
        const day = String(baseDate.getDate()).padStart(2, '0');
        const month = String(baseDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = String(baseDate.getFullYear()).slice(-2); // Get last two digits of the year
        const hours = String(baseDate.getHours()).padStart(2, '0');
        const minutes = String(baseDate.getMinutes()).padStart(2, '0');

        const currentYear = new Date().getFullYear();
        const formattedYear = baseDate.getFullYear() === currentYear ? '' : `/${year}`;
        return `${noTime ? '' : `${hours}:${minutes} - `} ${day}/${month}${formattedYear}`;
    }

    if (format === 'compactDayFirst') {
        const day = String(baseDate.getDate()).padStart(2, '0');
        const month = String(baseDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = String(baseDate.getFullYear()).slice(-2); // Get last two digits of the year
        const hours = String(baseDate.getHours()).padStart(2, '0');
        const minutes = String(baseDate.getMinutes()).padStart(2, '0');

        return `${noTime ? '' : `${day}/${month}/${year} - `} ${hours}:${minutes}`;
    }

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

    const day = baseDate.getDate();
    const month = monthNames[baseDate.getMonth()];
    const year = baseDate.getFullYear();

    return `${day} de ${month} de ${year}`;
};
