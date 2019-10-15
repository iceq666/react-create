## 创建一个react脚手架

1. 初始化项目——``yarn init``或``yarn init -y``
   
2. 新建目录
   - src 源代码目录
    - index.js webpack4.x以上有新特性，约定大于配置，默认入口文件为src->index.js
   - dist 产品目录 默认出口文件为dist->main.js

3. 安装webpack webpack-cli webpack-dev-server
   ```yarn add webpack webpack-cli webpack-dev-server --dev``
   webpack4.x以上，webpack和webpack-cli分离，webpack命令实际由webpack-cli执行

4. 配置webpack.config.js
   - mode:['development'|'production']：development为开发模式，production未生产模式，打包的js文件会进行压缩
   - entry: 默认入口是src->index.js 由于webpack4.x以上版本的约定大于配置特性，为了减少配置文件的体积
   - output: 默认出口是dist->main.js 

5. webpack-dev-server生成的main.js默认是放到内存上，而项目目录是在物理磁盘上，为了防止损坏物理磁盘，所以生成的localhost:8080/下看不到main.js却可以加载出来
   
6. 设置``"dev": "webpack-dev-server --open --port 3000 --hot --progress --compress"``
   --open:自动打开浏览器  --port 3000 在3000端口打开  --hot 热加载  --progress 记录 --compress 压缩 --host 指定域名

7. 使用html-webpack-plugin在内存中自动生成index页面的插件，速度更快
   ``yarn add html-webpack-plugin --dev``
   在webpack.config.js中导入
   ``const HtmlWepbackPlugin=require('html-webpack-plugin')``
   然后创建一个插件的实例对象
   ```javascript
      const htmlPlugin=new HtmlWepbackPlugin({
       template:path.join(__dirname,'./src/index.html'),//源文件
       filename:'index.html'//生成的内存中首页的名称
   })
   ```
   然后在module.export={}的plugins数组添加htmlPlugin

8. 在项目中使用react
   - 运行``yarn add react react-dom``安装
   - 使用babel处理jsx语法 
    1. 运行``yarn add babel-core babel-loader babel-plugin-transform-runtime --dev``等babel插件
      - 这里可能在编译时有问题，babel7.x要求使用@babel/core等形式，如果仍要使用babel-core(babel 6.x)应该``yarn add babel-loader@7 --dev``
      - 报错信息：
      ```
        Error: Cannot find module '@babel/core'
       babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.
      ```
    1. 运行``yarn add babel-preset-env babel-preset-stage-0 --dev``等babel插件
    2. 运行``yarn add babel-preset-react --dev``能够识别转换jsx语法
    3. 在webpack.config.js中配置module的rules规则
      ```javascript
        {
          test: /\.js|jsx$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ```
    4. 添加.babelrc文件
      ```json
      {
        "presets": ["env","stage-0","react"], //语法
        "plugins": ["transform-runtime"] //插件
      }
      ```
   - 在js文件中编写jsx语法，创建react组件

9. 使用css
    - 安装loader``yarn add style-loader css-loader --dev``
    - 在webpack.config.js中配置
      ```javascript
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]'
        ] //modules启用模块化，在组件上可以通过 Stylexx.title模拟实现作用域 localIdentName自定义根据所在位置定义类名
      }
      ```
    - 在组件页面中以stylexx.title类似的方法写类名，当由中划线的时候用属性选择器 stylexx['btn-primary']
10. 使用scss
    ``yarn add sass-loader node-sass --dev``
    在webpack中配置
    ```javascript
    {
      test: /\.scss$/,
      use: ['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]','sass-loader']
    },
    ```
11. 使用第三方库
    - bootstrap
      1. ``yarn add bootstrap@4``
      2. 处理图片文件loader ``yarn add url-loader --dev``,``yarn add file-loader --dev``
      3. 在组件页面中导入import
      4. 在webpack rules中配置url-loader
      5. 使用scss/less解决类名问题, 在sass/less上启用模块化，在css上不启用
  
12. 一些webpack.config.js配置
  - 省略后缀名
    ```javascript
        resolve:{
          extensions:[//省略后缀名设置
            '.js','.jsx','.json'
          ]
        }
    ```
  - 设置根目录
    在resolve中添加alias
    ```javascript
      alias:{
        '@': path.join(__dirname,'./src')//设置@为项目根目录的src这一层路径
      }
    ```
