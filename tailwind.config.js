/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    container: {
      center: true,
      padding: '24px',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        primary : {
          DEFAULT: '#007AFF',
          100: 'rgba(0, 122, 255, 0.15)'
        },
        secondary: "#14AE5C",
      disabled: "#8C929C",
      danger: {
        DEFAULT: "#F9261A",
        100: "#b3261e1c",
      },
    },
    fontSize: {
      lg: '22px',
      md: "17px",
      sm: "14px"
    }
  },
},
plugins: [
],
}

