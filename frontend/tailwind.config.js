/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
    "./public/index.html",
    "./src/Components/Hero/hero.jsx",
    "./src/Components/Login/login.jsx",
    "./src/Components/Testimonials/testimonials.jsx",
    "./src/Components/Navbar/navbar.jsx",
    "./src/Components/Button/button.jsx",
    "./src/Components/LogoCarausel/logocarausel.jsx",
    "./src/Elements/Dash/dash.jsx",
    "./src/Components/Footer/footer.jsx",
    "./src/Elements/Socials/socials.jsx",
    "./src/Components/Branding/branding.jsx",
    "./src/Components/Card/card.jsx",
    "./src/Components/ContactUs/contactus.jsx",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
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
  corePlugins: {
    preflight: false,
  },

  container: {
    center: true,
    padding: {
      default: "0rem",
      md: "0rem",
    },
  },
};
