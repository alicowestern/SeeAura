/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-white': '#FFFFFF',
                'brand-gray': '#2C2C2C',
                'brand-gold': '#D4AF37',
                'brand-cream': '#F9F9F7',
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Lato', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
