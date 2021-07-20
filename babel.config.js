module.exports = (api) => {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV || 'development')
  return {
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        { development: !api.env('production'), runtime: 'automatic' }
      ],
      '@babel/preset-typescript'],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-runtime',
      ['@babel/plugin-transform-modules-commonjs'],
      ['@babel/plugin-proposal-private-methods', { 'loose': true }],
      [
        '@babel/plugin-transform-spread',
        {
          'loose': true
        }
      ],
      ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      ['@babel/plugin-proposal-class-properties', { 'loose': true }],
      [
        '@ladifire-opensource/babel-plugin-transform-stylex',
        {
          'inject': true // will inject compiled css to stylesheet in head
        }
      ]
    ],
  }
}
