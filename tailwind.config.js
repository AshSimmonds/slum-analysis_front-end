/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            backdropBrightness: {
                25: ".25",
            },
            colors: require("daisyui/src/colors"),
        },
    },


    plugins: [
        require('@tailwindcss/typography'),
        require("daisyui"),
    ],


    daisyui: {
        styled: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        themes: [
            "light",
            "dark",
            {
                jbpslight: {
                    "primary": "#164e63",
                    "secondary": "#1e40af",
                    "accent": "#5b21b6",
                    "neutral": "#1D283A",
                    "base-100": "#e5e7eb",
                    "info": "#1e40af",
                    "success": "#15803d",
                    "warning": "#b45309",
                    "error": "#b91c1c",
                },
                jbpsdark: {
                    "primary": "#164e63",
                    "secondary": "#1e40af",
                    "accent": "#5b21b6",
                    "neutral": "#1D283A",
                    "base-100": "#0F1729",
                    "info": "#1e40af",
                    "success": "#15803d",
                    "warning": "#b45309",
                    "error": "#b91c1c",
                },
            }
        ],
    },

}
