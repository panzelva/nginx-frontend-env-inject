import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import dotenv from "dotenv";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebPackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import "webpack-dev-server";
import { getBrowserEnv, getWebpackDefineObj } from "./tools/container/env";

// TODO: types
const cfg = (env: any, argv: any): webpack.Configuration => {
  dotenv.config();
  const browserEnv = getBrowserEnv();
  const isDev = argv.mode !== "production";

  return {
    entry: "./src/main.tsx",
    output: {
      path: path.resolve("./dist"),
      publicPath: "/",
      filename: "[name].[fullhash].js",
    },
    module: {
      rules: [
        {
          test: /\.(jsx|tsx|js|ts)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            plugins: [isDev && "react-refresh/babel"].filter(Boolean),
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebPackPlugin({ template: "./public/index.html" }),
      new CleanWebpackPlugin(),
      ...(isDev
        ? [
            new webpack.DefinePlugin(getWebpackDefineObj(browserEnv)),
            new ReactRefreshWebpackPlugin(),
          ]
        : []),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    devServer: {
      hot: true,
    },
  };
};

export default cfg;
