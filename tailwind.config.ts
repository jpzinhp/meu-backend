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
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(15 23 42 / 0.06), 0 1px 3px 0 rgb(15 23 42 / 0.08)',
        card: '0 2px 8px -2px rgb(15 23 42 / 0.10), 0 4px 16px -4px rgb(15 23 42 / 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
