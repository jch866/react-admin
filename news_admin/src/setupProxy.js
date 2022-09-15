const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/ajax',
        createProxyMiddleware({
            target: 'https://i.maoyan.com', 
            changeOrigin: true
        })
    )
    // 可以配置多个
    //     app.use('/adminapi', createProxyMiddleware({
    //         target: 'http://appadmin.web.com',
    //         changeOrigin: true,// 默认为false,是否改变原始主机头为目标url
    //         ws: true,// 是否代理websockets
    //         pathRewrite: {// 重写path地址
    //             '^/api/ccc': '/api/ddd'// 将请求的/api/ccc重写解析到/api/ddd
    //         },
    //         router: {// 用于重写目标服务器
    //             // 当请求的host为172.14.14.102时重写目标服务器为后面的地址
    //             '172.14.14.102': 'http://appadmin.webapi.com'
    //         }
    //     }))
    // }
}

 