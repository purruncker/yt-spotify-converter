module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts}"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        18: "4.1rem",
        19: "4.7rem"
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        accent: {
          light: "#652799",
          DEFAULT: "#702BAA",
          dark: "#702baa"
        },
        white: {
          DEFAULT: "#fcfcfc",
          dark: "#f3f3f3",
          darkest: "#C1C1C5"
        },
        primary: {
          light: "#201b37",
          DEFAULT: "#070221",
          dark: "#050117"
        },
        spotify: {
          green: {
            light: "#349565",
            DEFAULT: "#1d8954",
            dark: "#1a7b4c"
          }
        },
        youtube: {
          red: {
            light: "#ff3333",
            DEFAULT: "#FF0000",
            dark: "#ff3333"
          }
        },
        error: {
          light: "#D25D5D",
          DEFAULT: "#c75151",
          dark: "#B94848"
        },
        warn: {
          light: "#FBC06E",
          DEFAULT: "#f0ad4e",
          dark: "#DE9939"
        },
        success: {
          light: "#66A55B",
          DEFAULT: "#538d4a",
          dark: "#497E40"
        },
        info: {
          light: "#378FC2",
          DEFAULT: "#277cad",
          dark: "#23719E"
        }
      },
      scale: {
        96: '.96',
        98: '.98',
      },
      gridTemplateColumns: {
        "3-auto": 'auto auto auto',
      },
      gridTemplateRows: {
        "2-auto": 'auto minmax(0, 1fr)',
        "3-auto": 'auto minmax(0, 1fr) auto',
      },
      maxWidth: (theme) => ({
        ...theme('spacing'),
      }),
      boxShadow: {
        "pl-items": "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.15)"
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
