const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const StylexPlugin = require('@ladifire-opensource/stylex-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const cacheGroups = {
  vendorCore: {
    name: 'vendor-core',
    test: /node_modules\/@ladifire.*/g,
    chunks: 'all',
    priority: 0,
    enforce: true
  },
  vendors: {
    name: 'vendor',
    test: /node_modules[\\/](?!@ladifire).*/g,
    priority: -10,
    enforce: true,
    chunks: 'initial'
  }
};

const configWebpack = (env, { mode = 'development' }) => {
  const isDev = mode === 'development'
  const config = {
    mode,
    entry: { app: path.resolve(__dirname, 'src/presentations/index.tsx') },
    output: {
      path: path.resolve(__dirname, 'dist'),
      // publicPath: './',
      filename: '[name].[fullhash:6].min.js',
    },
    target: isDev ? 'web' : 'browserslist',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias: {
        Lib: path.resolve(__dirname, 'src/_libs'),
        Utils: path.resolve(__dirname, 'src/_utils'),
        Assets: path.resolve(__dirname, 'src/_assets'),
        Constants: path.resolve(__dirname, 'src/_constants'),
        '@': path.resolve(__dirname, 'src'),
        '@@': path.resolve(__dirname, 'src/presentations'),
        Components: path.resolve(__dirname, 'src/presentations/components'),
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 5,
        maxAsyncRequests: 7,
        cacheGroups,
      },
      removeEmptyChunks: true,
      minimize: !isDev,
      mangleWasmImports: true,
      mergeDuplicateChunks: true,
      nodeEnv: mode,

    },
    module: {
      rules: [
        // {
        //   test: /\.(jsx|js)$/,
        //   exclude: /node_modules/,
        //   use: [
        //     {
        //       loader: 'babel-loader',
        //       options: {
        //         plugins: [
        //           isDev && require.resolve('react-refresh/babel'),
        //         ].filter(Boolean),
        //       },
        //     },
        //     {
        //       loader: StylexPlugin.loader,
        //       options: {
        //         inject: false,
        //       },
        //     },
        //   ]
        // },
        {
          test: /\.(tsx|ts)$/,
          enforce: 'pre',
          exclude: /node_modules|browser_components/,
          use: [
            // {
            //   loader: 'ts-loader',
            //   options: {
            //     getCustomTransformers: () => ({
            //       before: isDev ? [ReactRefreshTypeScript()] : [],
            //     }),
            //     // `ts-loader` does not work with HMR unless `transpileOnly` is used.
            //     // If you need type checking, `ForkTsCheckerWebpackPlugin` is an alternative.
            //     transpileOnly: isDev,
            //   },
            // },
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
            {
              loader: StylexPlugin.loader,
              options: {
                inject: false,
              },
            },
          ],
        },
        {
          test: /\.(s[ac]ss|css)$/,
          exclude: /node_modules/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', // Parse the css into js
              options: { sourceMap: isDev },
            },
            {
              loader: 'sass-loader', // Convert Scss/sass to css
              options: { sourceMap: isDev },
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          include: path.join(__dirname, 'public'),
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: () => (isDev ? '[path][name].[ext]' : '[chunkhash].[ext]'),
              },
            },
          ],
        },
      ],
    },
    // stats: { warningsFilter: /export .* was not found in/ },
    // ignoreWarnings: [/Failed to parse source map/],
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode, // use 'development' unless process.env.NODE_ENV is defined
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
      }),
      new StylexPlugin(),
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, 'dist/index.html'),
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[fullhash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[fullhash].css',
      }),
      new CleanWebpackPlugin(),
    ],
  }

  if (isDev) {
    config.devtool = 'inline-source-map'
    config.module.rules.push({
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      use: ['source-map-loader'],
    })
    config.watchOptions = {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: /node_modules/,
    }
    config.plugins = [
      ...config.plugins,
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
    ]
    config.devServer = {
      clientLogLevel: 'silent',
      transportMode: 'ws',
      contentBase: path.resolve(__dirname, 'src'),
      hot: true,
      open: true,
      port: 9000,
      overlay: false,
      inline: true,
      compress: true,
      publicPath: '/',
      historyApiFallback: true,
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: true,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: false,
        entrypoints: false,
      },
    }
  }

  return config
}

module.exports = configWebpack
// export default configWebpack;
