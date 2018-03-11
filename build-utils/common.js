const path = require('path');

module.exports = {
  outputPath: path.resolve(__dirname, '../', 'dist'),
  nodeModules: path.resolve(__dirname, '../', 'node_modules'),
  src: path.resolve(__dirname, '../', 'src'),
  public: path.resolve(__dirname, '../', 'public'),
  report: path.resolve(__dirname, '../', 'reports'),
  PostCSSConfig: {
    plugins: () => [
      require('postcss-url')(),
      require('autoprefixer')({
        flexbox: 'no-2009'
      })
    ]
  }
};
