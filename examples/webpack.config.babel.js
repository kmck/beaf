import path from 'path';
import glob from 'glob';

const srcFiles = glob.sync(path.join(__dirname, './*/index.jsx'));
const entryFiles = {};
srcFiles.forEach((src) => {
  entryFiles[path.parse(path.dirname(src)).name] = src;
});

const webpackConfig = {
  devtool: 'source-map',
  context: __dirname,
  entry: entryFiles,

  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }, {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
    }],
  },
};

module.exports = webpackConfig;
