module.exports = {
  entry: './client/index.jsx',

  output: {
    filename: 'client/bundle.js',
    path: __dirname,
    publicPath: ''
  },

  module: {
    loaders: [
      {
        test: /\.jsx$|\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?presets[]=es2015&presets[]=react'
        ]
      }
    ]
  }

}
