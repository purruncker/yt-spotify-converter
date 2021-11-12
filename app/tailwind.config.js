module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts}"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#702BAA"
        },
        white: {
          DEFAULT: "#FCFCFC"
        },
        primary: {
          DEFAULT: "#070221"
        }
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem"
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1500px"
     }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1500px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
