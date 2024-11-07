/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: '#1074E7',
                offwhite: '#F5F5F5',
                offblack: '#112233',
                gray: '#E3E3E3',
            },
            dropShadow: {
                header: '0 4px 4px rgba(16, 116, 231, 0.1)',
            },
            backgroundImage: {
                hero: "url('https://res.cloudinary.com/dzh6bz0zi/image/upload/v1730570970/media/iy48f6xc9urpf0kdp3lm.jpg')",
                form: 'url(https://res.cloudinary.com/dzh6bz0zi/image/upload/v1731011446/media/ezs0b2ip4g7fpae9mgcr.jpg)',
                footer: 'url(https://res.cloudinary.com/dzh6bz0zi/image/upload/v1731011446/media/k2utc6qnpazlppx4f9gi.jpg)',
            },
        },
    },
    plugins: [],
};
