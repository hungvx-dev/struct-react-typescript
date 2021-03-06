const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
// const autoprefixer = require('autoprefixer');
const cacheGroups = {
  styles: {
    name: "style",
    test: /\.scss$/,
    chunks: "all",
    enforce: true,
  },
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
        react: path.resolve(__dirname, './node_modules/react'),
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
      runtimeChunk: "single",
      removeEmptyChunks: true,
      minimize: !isDev,
      mangleWasmImports: true,
      mergeDuplicateChunks: true,
      nodeEnv: mode,
    },
    module: {
      rules: [
        {
          test: /\.([jt]sx|[jt]s)$/,
          enforce: 'pre',
          exclude: /node_modules|bower_components/,
          use: [
            {
              loader: "ts-loader",
              options: {
                getCustomTransformers: () => ({
                  before: isDev
                    ? [ReactRefreshTypeScript()]
                    : [],
                }),
                transpileOnly: isDev,
              },
            },
          ],
        },
        {
          test: /\.(s[ac]ss|css)$/,
          sideEffects: true,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', // Parse the css into js
              options: { sourceMap: isDev },
            },
            {
              loader: 'sass-loader', // Convert Scss/sass to css
              options: {
                sourceMap: isDev,
                implementation: require('sass'),
                webpackImporter: false,
                sassOptions: {
                  includePaths: ['./node_modules']
                },
              },
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
      new webpack.ProgressPlugin(),
      new ForkTsCheckerWebpackPlugin({
        async: false,
      }),
      new HtmlWebpackPlugin({
        hash: false,
        filename: path.resolve(__dirname, 'dist/index.html'),
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[fullhash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[fullhash].css',
      }),
      new CleanWebpackPlugin({ verbose: true }),
    ],
    performance: {
      maxEntrypointSize: 800000
    }
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
