/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: "#1074E7",
        offwhite: "#F5F5F5",
        offblack: "#112233",
        gray: "#E3E3E3"
      },
      dropShadow: {
        'header': '0 4px 4px rgba(16, 116, 231, 0.1)',
      },
    },
  },
  plugins: [],
};
