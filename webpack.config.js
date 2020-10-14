const path = require("path");
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webbpack = require('webpack')
module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "static/js/[name].bundle.js",
  },
  // resolve: {
  //   extensions: ["*", ".js", ".vue"]
  // },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    port: 8000,
    stats: {
      normal: true
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          cacheDirectory: true
        }
      },
      {
        test: /.vue$/, 
        loader: 'vue-loader'
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
              // reloadAll: true
            }
          },
          // "vue-style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(svg||woff2||woff||less||ttf||eot)$/,
        loader: "file-loader",
        options: {
          name: "static/fonts/[name].[hash:8].[ext]"
        }
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new webbpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.[id].css"
    }),
    new HtmlWebpackPlugin({
      showErrors: true,
      cache: true,
      filename: "index.html",
      template: "public/index.html"
    })
  ]
};
