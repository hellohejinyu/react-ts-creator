module.exports = (api) => {
  const presets = [
    [
      '@babel/env', {
        targets: {
          ie: 11
        },
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/typescript',
    '@babel/react'
  ]
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/proposal-optional-chaining',
    '@babel/proposal-nullish-coalescing-operator',
    'react-hot-loader/babel'
  ]
  api.cache(false)
  return { presets, plugins }
}
