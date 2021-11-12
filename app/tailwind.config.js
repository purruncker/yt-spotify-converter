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
          DEFAULT: "#fcfcfc",
          dark: "#f3f3f3",
          darkest: "#C1C1C5"
        },
        primary: {
          DEFAULT: "#070221"
        },
        spotify: {
          green: {
            DEFAULT: "#1d8954"
          }
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
    fontSize: {
      xs: ['0.78rem', { lineHeight: '1.1rem' }],
      sm: ['0.88rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }]
    },
    fontWeight: {
      normal: '400',
      semibold: '500',
      bold: '800'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
