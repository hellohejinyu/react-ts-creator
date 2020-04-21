const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    postcssPresetEnv({
      autoprefixer: {
        overrideBrowserslist: ['Chrome > 38', 'ie >= 8'],
      },
    }),
  ],
}
