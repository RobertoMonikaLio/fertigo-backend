/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": {
                    '50': '#f0fdf4',
                    '100': '#dcfce7',
                    '200': '#bbf7d0',
                    '300': '#86efac',
                    '400': '#4ade80',
                    '500': '#22c55e',
                    '600': '#16a34a',
                    '700': '#15803d',
                    '800': '#166534',
                    '900': '#14532d',
                    '950': '#052e16',
                    DEFAULT: '#16a34a'
                },
                "secondary": "#FFB900",
                "background-light": "#F5F7FA",
                "background-dark": "#101922",
                "text-light": "#333333",
                "text-dark": "#F5F7FA",
                "card-light": "#ffffff",
                "card-dark": "#192734",
                "border-light": "#E1E4E8",
                "border-dark": "#333333",
                "surface-light": "#FFFFFF",
                "surface-dark": "#192734",
                "status-green": "#28a745",
                "status-yellow": "#ffc107",
                "status-blue": "#0d9488"
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Inter', 'sans-serif'],
                title: ['DM Sans', 'sans-serif'],
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "0.75rem",
                "xl": "1rem",
                "full": "9999px"
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'kenburns': 'kenburns 30s ease-in-out infinite alternate',
                'scroll-left': 'scroll-left 40s linear infinite',
                'scroll-right': 'scroll-right 40s linear infinite',
                'grow-up': 'grow-up 0.5s ease-out forwards',
                'grow-right': 'grow-right 0.5s ease-out forwards',
                'slide-in-up': 'slideInUp 0.5s ease-out forwards',
                'slide-out-down': 'slideOutDown 0.5s ease-in forwards',
                'slide-in-right': 'slideInRight 0.35s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                kenburns: {
                    '0%': { transform: 'scale(1) translate(0, 0)', 'transform-origin': 'center' },
                    '100%': { transform: 'scale(1.1) translate(-2%, 1%)', 'transform-origin': 'center' },
                },
                'scroll-left': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                'scroll-right': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'grow-up': {
                    '0%': { transform: 'scaleY(0)', 'transform-origin': 'bottom' },
                    '100%': { transform: 'scaleY(1)', 'transform-origin': 'bottom' },
                },
                'grow-right': {
                    '0%': { transform: 'scaleX(0)', 'transform-origin': 'left' },
                    '100%': { transform: 'scaleX(1)', 'transform-origin': 'left' },
                },
                slideInUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideOutDown: {
                    '0%': { transform: 'translateY(0)', opacity: '1' },
                    '100%': { transform: 'translateY(100%)', opacity: '0' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
}

