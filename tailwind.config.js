/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2239E5',
          hover: '#192BB3',
          light: '#E8EAFF',
          dark: '#142299',
        },
        accent: {
          DEFAULT: '#F9FF33',
          hover: '#E6EC00',
          muted: '#FCFFA1',
        },
        pink: {
          DEFAULT: '#F472B6',
          hover: '#EC4899',
          light: '#FDF2F8',
        },
        bglight: '#EEEEEE',
        surfacelight: '#F2F2F2',
        ink: '#111111',
        gradientStart: '#6D7CF5',
        gradientEnd: '#4A5CE8',
        medal: {
          gold: '#FACC15',
          silver: '#D1D5DB',
          bronze: '#FB923C',
        },
        subject: {
          twk: '#FECACA',
          'twk-dark': '#991B1B',
          tiu: '#FBCFE8', // pink-tint
          'tiu-dark': '#9D174D',
          tkp: '#BFDBFE', // blue-tint
          'tkp-dark': '#1E40AF',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'heading-1': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '800' }],
        'heading-2': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-3': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        'section': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }], // 14px
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }], // 12px
        'micro': ['0.6875rem', { lineHeight: '1.2', fontWeight: '700' }], // 11px
      },
      borderRadius: {
        'neo': '28px',
        'neo-lg': '32px',
        'neo-top': '40px',
        'chip': '16px',
        'pill': '9999px',
      },
      borderWidth: {
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      boxShadow: {
        'neo': '4px 4px 0 #000000',
        'neo-hover': '6px 6px 0 #000000',
        'neo-sm': '2px 2px 0 #000000',
        'neo-lg': '8px 8px 0 #000000',
        'top-overlap': '0 -4px 20px rgba(0, 0, 0, 0.1)',
      },
      ringWidth: {
        '3': '3px',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
    },
  },
  plugins: [],
}
