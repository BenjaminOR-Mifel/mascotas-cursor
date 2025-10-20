// postcss.config.js

const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    autoprefixer(),
    ...(process.env.NODE_ENV === "production"
      ? [
          purgecss({
            content: ["./public/**/*.html", "./src/**/*.vue"],
            defaultExtractor(content) {
              // eliminamos bloques <style> para no purgar clases usadas en apply
              const contentWithoutStyleBlocks = content.replace(
                /<style[^]+?<\/style>/gi,
                ""
              );
              return (
                contentWithoutStyleBlocks.match(
                  /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
                ) || []
              );
            },
            safelist: {
              standard: [
                /-(leave|enter|appear)(-(to|from|active))$/,
                /^(?!(.*?:)cursor-move).+-move$/,
                /^router-link(-exact)-active$/,
                /data-v-.*/,
                /svg.*/,
                /fa.*/,
                /^d-*/,
                /^v-/,
                /^v-icon/,
                /^container/,
                /^v-text-field/,
                /^input/,
                /^select/,
                /^form/,
                /^button/,
                /^table/,
                /^thead/,
                /^tr/,
                /^td/,
                /^th/,
                /^text-/,
                /^i/,
                /^icon/,
                /^span/,
                /^p/,
                /^col/,
                /^row/,
                /^mdi/,
                /^theme-/,
                /^spacer/,
                /^legend/,
                /^fieldset/,
                /^light/,
                /^primary/,
                /^div/,
                /^after/,
                /^before/,
                /^menuable__/, // menuable__content__active y compañeras
                /^v-application/, // v-application, v-application--wrap
                /^application--wrap/,
                /^v-tooltip/, // v-tooltip, v-tooltip__content…
                // variantes con sufijo “*” (si aún las necesitas)
                /^v-*/,
                /^v-icon*/,
                /^container*/,
                /^v-text-field*/,
                /^input*/,
                /^select*/,
                /^form*/,
                /^button*/,
                /^table*/,
                /^thead*/,
                /^tr*/,
                /^td*/,
                /^th*/,
                /^text-*/,
                /^i*/,
                /^icon*/,
                /^span*/,
                /^p*/,
                /^col*/,
                /^row*/,
                /^mdi*/,
                /^mdi-*/,
                /^theme-*/,
                /^spacer*/,
                /^legend*/,
                /^fieldset*/,
                /^light*/,
                /^primary*/,
                /^div*/,
                /^after*/,
                /^before*/,
              ],
              deep: [/modal*/, /html/],
            },
          }),
        ]
      : []),
  ],
};
