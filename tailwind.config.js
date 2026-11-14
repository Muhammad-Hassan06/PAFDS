/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#101D2B',
          light: '#16273A',
          dark: '#0A131D',
        },
        ivory: {
          DEFAULT: '#F5F4EF',
          dark: '#EBE9E1',
          subtle: '#FAF9F6',
        },
        teal: {
          DEFAULT: '#176B62',
          hover: '#12564F',
          light: '#EBF4F3',
          muted: '#228B80',
        },
        amber: {
          DEFAULT: '#D9A441',
          light: '#FDF8EC',
          dark: '#B38228',
        },
        charcoal: {
          DEFAULT: '#202A32',
          muted: '#384652',
        },
        slate: {
          DEFAULT: '#697681',
          light: '#8E9AA4',
        },
        border: {
          DEFAULT: '#E4E7E5',
          dark: '#233446',
          strong: '#CFD5D2',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'editorial': '0 1px 2px 0 rgba(16, 29, 43, 0.04), 0 4px 16px -2px rgba(16, 29, 43, 0.05)',
        'editorial-lg': '0 4px 6px -1px rgba(16, 29, 43, 0.04), 0 16px 36px -4px rgba(16, 29, 43, 0.08)',
        'panel': '0 1px 3px 0 rgba(16, 29, 43, 0.06)',
      }
    },
  },
  plugins: [],
}
