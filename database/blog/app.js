// 引用express框架
const express = require('express');
// 创建网站服务器
const app = express()
    // 为了绝对目录 引用path模块
const path = require('path')
    // 引入body-parser模块 用来处理post请求参数
const bodyParser = require('body-parser');

// session-1  导入express-session模块
const session = require('express-session')


// 引入数据库连接文件connect
require('./model/connect')

// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }))

// session-2 配置session
app.use(session({
    secret: 'secret key'
}))

// 引入数据库创建例子user.js测试代码
// require('./model/user')
// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art的模板时,所使用的模板引擎是什么
app.engine('art', require('express-art-template'))
    //================================================
    // 开发静态资源文件  static()静态资源目录 绝对目录用到path
app.use(express.static(path.join(__dirname, 'public')))
    //================================================
    //引用路由模块
    // 引入home博客首页页面  ---路由对象
const home = require('./route/home')
    // 引入admin博客登录页面  ---路由对象
const admin = require('./route/admin')
    //================================================
    // 拦截请求 express提供的中间件
app.use('/admin', require('./middleware/loginGuard'))
    //================================================
    // 为路由请求路径
app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON.parse() 
    const result = JSON.parse(err)

    let params = [];
    // 因为参数不确定,所以用到循环进行拼接参数
    for (let attr in result) {
        if (attr != 'path') {

            params.push(attr + "=" + result[attr])
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`)
})








// 监听端口
app.listen(80)
console.log('网站服务器已启动成功')