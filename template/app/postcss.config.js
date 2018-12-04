const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({
      browsers: [
        'Chrome > 38',
        'ie >= 8',
      ]
    })
  ]
};