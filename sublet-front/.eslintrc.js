export const parser = '@babel/eslint-parser';
export const parserOptions = {
  requireConfigFile: false,
  babelOptions: {
    babelrc: false,
    configFile: false,
    presets: ["@babel/preset-env"],
  },
};