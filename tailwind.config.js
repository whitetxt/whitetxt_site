/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./**/*.html", "./**/*.php", "./static/script/*.js"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["luxury"],
    },
};
