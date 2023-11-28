/** @type {import('tailwindcss').Config} */
// const aspectRatio = require("@tailwindcss/aspect-ratio");
module.exports = {
  content: [
    "./src/**/*{.js,.jsx,.ts,.tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },

      animation: {
        "infinite-slider": "infinite-slider 30s linear infinite",
      },
      keyframes: {
        "infinite-slider": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      colors: {
        white: "#fff",
        black: "#000",
        deepskyblue: "#00adeb",
        orangered: "#ff4f1d",
        dimgray: {
          100: "#69635a",
          200: "#625959",
        },
        lightcyan: "#dafef1",
        skyblue: "#6fd9ff",
        paleturquoise: "#b0f0f6",
      },

      fontFamily: {
        "open-sans": ["'Open Sans', sans-serif"],
      },
      borderRadius: {
        "3xs": "10px",
        "8xs": "5px",
      },
    },
    fontSize: {
      "5xl": "2.25rem",
      sm: "0.875rem",
      "21xl": "2.5rem",
      xl: "1.25rem",
      base: "1rem",
      "6xl": "1.5625rem",
      "41xl": "3.75rem",
      "13xl": "2rem",
      inherit: "inherit",
    },
  },
  Plugins: {
    preflight: false,
    // Add the @tailwindcss/aspect-ratio plugin and @tailwindcss/forms
    "@tailwindcss/aspect-ratio": {},
  },

  container: {
    center: true,
    padding: {
      default: "0rem",
      md: "0rem",
    },
  },
};
