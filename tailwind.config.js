// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg-blue)',
        surface: 'var(--bg-lighter-blue)',
        primary: 'var(--button-blue)',
        accent: 'var(--text-light-blue)',
        text: 'var(--text-white)',
        muted: 'var(--text-light-gray)',
        brand: {
          DEFAULT: '#1e40af',
          light: '#60a5fa',
          dark: '#1e3a8a',
        },
      },
      backgroundImage: {
        'bg-gradient': 'var(--gradient-bg)',
      },
    },
  },
}
