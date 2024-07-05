import { colors } from "./src/utilities/themes/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary-background": colors.BACKGROUND_COLOR,
      "primary-theme": colors.PRIMARY_THEME,
      white: colors.WHITE,
      black: colors.BLACK,
      "link-blue": colors.LINK,
      "grey": colors.GREY,
    },
    fontSize: {
      "2xl": "5rem",
      xl: "48px", // 48px
      lg: "32px", // 32px
      "lg-1": "24px", // 24px
      md: "18px", // 18px
      "md-1": "14px", // 16px
      sm: "12px", // 12px
    },
    lineHeight: {
      "2xl": "5rem",
      xl: "48px", // 48px
      lg: "32px", // 32px
      "lg-1": "2rem", // 24px
      md: "18px", // 18px
      "md-1": "14px", // 16px
      sm: "12px", // 12px
    },
    screens: {
      'sm-1': '520px',
      // => @media (min-width: 520px) { ... },

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      "semi-bold": "600",
      bold: "700",
    },
    boxShadow: {
      "shadow-sm": "0px 10px 20px 0px #0000000D",
      "shadow-md": " 0px 2px 4px 0px #25262C40",
      "shadow-spread-sm": " 0px 0px 5px 5px rgba(0, 0, 0, 0.05)",
      "shadow-spread": " 0px 0px 15px 10px #25262C40",
    },
    extend: {
      width: {
        "full-0.9": "90%",
      },
      height: {
        inputHeightLg: "55px",
        inputHeightMd: "45px",
      },
      margin: {
        basic: "0.5rem",
        moderate: "1rem",
        large: "1.5rem",
        xLarge: "3rem",
      },
      padding: {
        basic: "0.5rem",
        "basic-1": "0.7rem",
        moderate: "1rem",
        "moderate-1": "1.2rem",
        large: "1.5rem",
        xLarge: "3rem",
      },
    },
  },
  plugins: [],
}

