const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
    plugins: [
        // purgecss({
        //     content: ["./*.html", "./*.php", "./clips/*.php", "./static/script/*.js"],
        // }),
        require("cssnano")({
            preset: "default",
        }),
    ],
};
