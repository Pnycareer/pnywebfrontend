/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       backgroundImage: {
        'radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        fontFamily: {
        oswald: ['var(--font-oswald)', 'Arial', 'sans-serif'],
      },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
