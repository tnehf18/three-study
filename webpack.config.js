const path = require("path");
const { version } = require('./package.json');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `three-study.${version}.min.js`
  },
};