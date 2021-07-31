module.exports = {
    //表示准备配置config
    configureWebpack: {
        // 配置路径相关 解决路径相关的问题
        resolve: {
            //extension: [], //有些路径的后缀名可以忽略
            // 配置别名
            alias: {
                '@': 'src', //艾特对应的就是src(默认的)
                'common': '@/common',
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    },
}