// 1.创建网站服务器程序---用到http模块
// 2.实现客户端的请求和访问

// 1.引入http模块
const http = require('http');
// 引入第三方模板文件 router 有返回值 是获取路由对象的
const getRouter = require('router');
// 引入模板引擎art-template
const template = require('art-template');

// 引入path模块
const path = require('path');

// 引入querystring模块
const querystring = require('querystring')
    // 引入静态资源访问模块
const serveStatic = require('serve-static')

// 获取路由对象
const router = getRouter();
// 实现静态资源服务
const serve = serveStatic(path.join(__dirname, 'public'))



// 配置模板的根目录  __dirname用来获取当前文件所在的绝对路径
template.defaults.root = path.join(__dirname, 'views')

// 呈递学生档案信息页面
router.get('/index', (req, res) => {
        let html = template('index.art', {})
        res.end(html)
    })
    // 呈递学生档案列表页面
router.get('/list', (req, res) => {
        let html = template('list.art', {})
        res.end(html)
    })
    // 下载art-template模板引擎
    // 3.添加实现学生信息功能路由
router.post('/add', (req, res) => {
    // 接收客户端请求参数 绑定两个事件 data事件和end事件
    // 事件处理函数
    let formData = '';
    req.on('data', param => {
        formData += param
    });
    req.on('end', async() => {
        // formData 字符串形式
        // 引用querystring模块进行对格式的解析

        console.log(querystring.parse(formData))
            // 集合是Student 用create()插入数据库中 await异步
        await Student.create(querystring.parse(formData))

        // console.log(formData)


        // 重定向
        res.writeHead(301, {
                Location: '/list'
            })
            // 做出一个响应
        res.end()

    })
})


// 用require把数据库连接文件引入进来
require('./model/connect')
    // 用require把数据库集合规则文件引入进来  有返回值就是学生集合构造函数
const Student = require('./model/user')


// 2.创建网站服务器
const app = http.createServer()
    // 当客户端访问服务器端的时候
app.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // res.end("服务器连接成功") 启用路由功能
    router(req, res, () => {

        })
        // 启用静态资源访问服务功能
    serve(req, res, () => {
        // console.log("server被调用了")
    })
})

// 添加端口
app.listen(80);
console.log("服务器启动成功")
    // 在Powershell开启服务器 用的是nodemon