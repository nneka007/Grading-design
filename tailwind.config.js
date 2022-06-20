module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '312px',
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    backgroundColor: {
      primary: '#000E3C'
    },
    extend: {
      backgroundColor: {
        primary: '#000E3C'
      },
    },
  },
  plugins: [],
}
