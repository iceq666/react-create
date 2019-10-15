// webpack是基于node.js,所以webpack支持node.js的api和语法
//node.js现在不支持es6的语法，所以不能直接在webpack里用，如export.defalut={}
const path=require('path')//配置绝对路径
const HtmlWepbackPlugin=require('html-webpack-plugin')//导入在内存中自动生成index页面的插件

// 创建html-webpack-plugin插件的实例对象
const htmlPlugin=new HtmlWepbackPlugin({
    template:path.join(__dirname,'./src/index.html'),//源文件
    filename:'index.html'//生成的内存中首页的名称
})
//webpack默认只能打包.js后缀名的文件，其他的都要配置第三方的loader
module.exports={
    mode:'development',
    resolve:{
      extensions:[//省略后缀名设置
        '.js','.jsx','.json'
      ],
      alias:{
        '@': path.join(__dirname,'./src')//设置@为项目根目录的src这一层路径
      }
    },
    plugins:[
        htmlPlugin
    ],
    module:{//所有第三方模块的配置规则
      rules:[
        {
          test: /\.js|jsx$/,
          use: 'babel-loader',
          exclude: /node_modules/ //千万要记得exclude排除
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader?modules'
          ] //modules启用模块化，在组件上可以通过 Stylexx.title模拟实现作用域 localIdentName自定义根据所在位置定义类名
        },
        {
          test: /\.scss$/,
          use: ['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash:base64:5]','sass-loader']
        },
        {
          test: /\.ttf|woff|woff2|eot|svg$/,
          use: 'url-loader'
        }
      ]
    }
}