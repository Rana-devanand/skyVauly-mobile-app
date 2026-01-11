module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "babel-plugin-module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./app",
            "@assets": "./assets",
            "@src": "./src",
          },
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".json"
          ],
        },
      ],
    ],
  };
};
