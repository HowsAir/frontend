import axios from 'axios';

export async function validatePostalCode(
    value: string
): Promise<string | boolean> {
    const city = 'Valencia';

    try {
        const response = await axios.get(
            `https://codigos-postales-de-espana.p.rapidapi.com/?codigo-postal=${value}`,
            {
                headers: {
                    'x-rapidapi-host':
                        'codigos-postales-de-espana.p.rapidapi.com',
                    'x-rapidapi-key':
                        '91b94116d4msha1fb8f901c734d7p1b28c7jsned8de90bcfcd',
                },
            }
        );

        // Validate based on the city in the response
        if (response.data && response.data[0].municipio === city) {
            return true;
        } else {
            return `Este C.P. no pertenece a ${city}`;
        }
    } catch (error) {
        return 'Error al validar';
    }
}
