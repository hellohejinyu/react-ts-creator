module.exports = (api) => {
  const presets = [
    '@babel/env',
    '@babel/typescript',
    '@babel/react'
  ]
  const plugins = [
    'react-hot-loader/babel',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread'
  ]
  api.cache(false)
  return { presets, plugins }
}