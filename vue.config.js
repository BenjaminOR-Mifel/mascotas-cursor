const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const webpack = require("webpack");

module.exports = defineConfig({
  productionSourceMap: false,
  parallel: true,

  transpileDependencies: ["vuetify"],

  css: {
    extract: process.env.NODE_ENV === "production",
    sourceMap: false,
  },

  configureWebpack: {
    cache: {
      type: "filesystem",
      cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack"),
      buildDependencies: { config: [__filename] },
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
  },

  pluginOptions: {
    i18n: {
      locale: "es",
      fallbackLocale: "es",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
});
