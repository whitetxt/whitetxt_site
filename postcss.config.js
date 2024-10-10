const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    purgecss({
      content: ["./*.html", "./*.php", "./clips/*.php"],
    }),
    require("cssnano")({
      preset: "default",
    }),
  ],
};
