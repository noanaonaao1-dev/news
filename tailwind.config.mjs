/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0b3b5e',
          dark: '#082a44',
          light: '#125486',
        },
      },
    },
  },
  plugins: [],
}
