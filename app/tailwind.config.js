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
    },
    fontFamily: {
      sans: [
        '"Whitney"',
        'ui-sans-serif',
        'system-ui',
        '"Segoe UI"',
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
