const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => ({
    entry: {
        main: "./src/index.tsx",
    },
    output: {
        path: path.resolve(__dirname, "../docs/point-game/"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    enforce: true,
                },
                styles: {
                    test: /\.less$/,
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader", // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                    },
                    {
                        loader: "less-loader", // compiles Less to CSS
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico|otf|ttf|eot|md)$/,
                exclude: /node_modules/,
                use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
            },
            {
                test: /\.woff(2)?(\?[a-z0-9]+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff",
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            favicon: "./public/favicon.ico",
        }),
        ...(argv.mode === "production"
            ? [
                  new CleanWebpackPlugin({
                      verbose: true,
                      dry: false,
                      cleanOnceBeforeBuildPatterns: [
                          "index.html",
                          "*.js",
                          "*.js.map",
                          "*.css",
                          "*.css.map",
                      ],
                  }),
              ]
            : []),
    ],
    externals: {
        appsettings: JSON.stringify(
            argv.mode === "production"
                ? require("./config.prod.json")
                : require("./config.dev.json")
        ),
    },
});
