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
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
