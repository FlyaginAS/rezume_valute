const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const { mode = 'development' } = env;
  const isProd = mode == 'production';
  const isDev = mode == 'development';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
    ];
  };

  const getPlugins = () => {
    const plugins = [
      //html***************************************************
      new HtmlWebpackPlugin({
        title: 'Hello world',
        template: './public/index.html',
      }),
    ];
    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: '[main]-[hash:8].css',
        })
      );
    }

    return plugins;
  };

  return {
    mode: isProd ? 'production' : isDev && 'development',

    output: {
      filename: isProd ? 'main-[hash:8].js' : undefined,
    },

    module: {
      rules: [
        //loading images**************************************
        {
          test: /.(png|jpg|gif|jpeg|ico|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:7].[ext]',
              },
            },
          ],
        },
        //loading fonts*****************************************
        {
          test: /.(ttf|woff|woff2|eot|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]',
              },
            },
          ],
        },
        //loading JS*****************************************
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        //loading CSS*****************************************
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },
        //loading SCSS*****************************************
        {
          test: /\.(s[ca]ss)$/,
          use: [
            ...getStyleLoaders(),
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
    //plugins******************************************************
    plugins: getPlugins(),
    //devServer****************************************************
    devServer: {
      open: true,
    },
  };
};
