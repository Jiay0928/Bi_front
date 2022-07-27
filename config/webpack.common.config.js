const path = require('path');

module.exports = {
    mode:"development",
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      path: path.resolve(__dirname, './public'),
      filename: 'bundle.js',
    },
    devServer: {
        // 静态文件目录
        static: {
          directory: path.join(__dirname, "../public")
        },
    
        compress: true,
        port: 8080, // default 8000

      },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,//不需要去转译"node\_modules"这里面的文件。
      },
      {
        test: /\.css$/,
        use: [ 
           
          'style-loader',// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里
          'css-loader' // css-loader加载器去解析这个文件，遇到“@import”等语句就将相应样式文件引入
        ]
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js','jsx']
  },
}