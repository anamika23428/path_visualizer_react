/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px', // Small screens (default Tailwind sm)
        md: '876px', // Medium screens (default Tailwind md)
        lg: '1024px', // Large screens (default Tailwind lg)
        xl: '1280px', // Extra large screens (default Tailwind xl)
        '2xl': '1536px', // 2x Extra large screens (default Tailwind 2xl)
        // Add custom breakpoints if needed
        xs: '480px', // Extra small screens
      },
      fontFamily:{
        sans: ['Roboto' , 'sans-serif']
      }
    },
  },
  plugins: [],
}