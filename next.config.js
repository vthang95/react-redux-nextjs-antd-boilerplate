const path = require("path")
const webpack = require("webpack")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const { ANALYZE } = process.env
// :TODO -lp use extract-text-webpack-plugin

module.exports = {
  webpack: (config, {dev}) => {
    config.devtool = false

    // disable soucemaps of babel-loader
    for (const r of config.module.rules) {
      if (r.loader === 'babel-loader') {
        r.options.sourceMaps = false
      }
    }

    config.resolve = {
      modules: ["pages", "node_modules"],
      mainFields: [
        "browser",
        "main",
      ],
      alias: {
      }
    }

    config.module.rules.push(
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: "url-loader?limit=100000"
      },
      {
        test: /\.(css|scss)/,
        loader: "emit-file-loader",
        options: {
          name: "dist/[path][name].[ext]"
        }
      },
      {
        test: /\.css$/,
        use: ["babel-loader", "raw-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: ["babel-loader", "raw-loader", "postcss-loader",
          { loader: "sass-loader",
            options: {
              includePaths: ["styles", "node_modules"]
                .map((d) => path.join(__dirname, d))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: "url-loader?limit=10000",
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "emit-file-loader",
        options: {
          name: "dist/[path][name].[ext]"
        }
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "emit-file-loader",
        options: {
          name: "dist/[path][name].[ext]"
        }
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "emit-file-loader",
        options: {
          name: "dist/[path][name].[ext]"
        }
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "emit-file-loader",
        options: {
          name: "dist/[path][name].[ext]"
        }
      }
    )

    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: "server",
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
      )
    }

    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /vi|en|lo/))

    return config
  }
}
