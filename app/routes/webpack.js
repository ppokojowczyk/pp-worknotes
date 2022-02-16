const webpackInit = (app) => {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const configFunc = require("../webpack.config");
  const config = configFunc(null, "development");
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, { publicPath: config.output.publicPath })
  );
  app.use(webpackHotMiddleware(compiler));
};

module.exports = webpackInit;
