/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      container: {
        padding: "3.5rem",
        center: true,
      },

      colors: {
        primary: "#2C3333",
        secondary: "#282A3A",
        accent: "#576CBC",
        background: "#DFDFDE",
        danger: "#D14D72",
        subtext: "#7B8FA1",
      },
    },
  },
  plugins: [],
};
