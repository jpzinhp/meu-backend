import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#dce6ff',
          200: '#b8ccff',
          300: '#8aa9ff',
          400: '#5c7fff',
          500: '#3a56f5',
          600: '#2a3fd1',
          700: '#2331a8',
          800: '#1f2b85',
          900: '#1c266b',
        },
        burger: {
          primary: '#E77F20',
          'primary-light': '#F4AE3E',
          gold: '#F7C447',
          brown: '#4E1301',
          'brown-dark': '#351003',
          'brown-light': '#7A2C06',
          white: '#FFFFFF',
          cream: '#FFF9F0',
          success: '#16794C',
          error: '#B42318',
          focus: '#FFD76A',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        script: ['"Segoe Script"', '"Brush Script MT"', '"Bradley Hand"', 'cursive'],
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(15 23 42 / 0.06), 0 1px 3px 0 rgb(15 23 42 / 0.08)',
        card: '0 2px 8px -2px rgb(15 23 42 / 0.10), 0 4px 16px -4px rgb(15 23 42 / 0.08)',
      },
      keyframes: {
        'fade-slide-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-slide-in': 'fade-slide-in 420ms cubic-bezier(0.4,0,0.2,1)',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
