module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      ["@babel/preset-env", { useBuiltIns: "usage", corejs: "3.9" }],
      ["@babel/preset-react", { runtime: "automatic" }],
      ["@babel/preset-typescript", { allExtensions: true, isTSX: true }],
    ],
  };
};
