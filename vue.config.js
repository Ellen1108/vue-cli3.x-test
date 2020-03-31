const merge = require('webpack-merge');// 用于做相应的合并处理
const configs = require('./config');//引入额外配置
const cfg = process.env.NODE_ENV === 'production' ? configs.build.env : configs.dev.env;
module.exports = {
  publicPath: './',// webpack 配置文件中 output 的 publicPath 项 (baseUrl)
  outputDir: 'output',//将构建好的文件打包输出到 output 文件夹下（默认是 dist 文件夹）
  productionSourceMap: true,//用于设置是否为生产环境构建生成 source map
  chainWebpack: config => { //chainWebpack为链式操作修改配置 需要使用 webpack-merge进行合并处理
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options =>
        merge(options, {
          limit: 2222,
        })
      )
    config.plugin('define')
      .tap(args => {
        let name = 'process.env';
        args[0][name] = merge(args[0][name], cfg);// 使用 merge 保证原始值不变
        console.log(args)
        return args
      })
  },
  configureWebpack: config => {//configureWebpack 更倾向于整体替换和修改
    // config.plugins = []; // 这样会直接将 plugins 置空
    // 使用 return 一个对象会通过 webpack-merge 进行合并，plugins 不会置空
    return {
      plugins: []
    }
  },
  devServer: { //用于配置 webpack-dev-server 的行为
    open: true, // 是否自动打开浏览器页面
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
    port: 8080, // 端口地址
    https: false, // 使用https提供服务
    proxy: null, // string | Object 代理设置
  }
  
};
