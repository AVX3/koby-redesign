tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff3ee',
          100: '#ffe0d1',
          200: '#ffb695',
          300: '#ff8a54',
          400: '#ff6428',
          500: '#fd4500',
          600: '#d63700',
          700: '#a92b00',
          800: '#7c2000',
          900: '#4f1400',
        },
        ink: {
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#262626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
      },
    }
  }
};
