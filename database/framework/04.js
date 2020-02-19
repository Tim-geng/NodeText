// 引入express框架
const express = require('express')
    // 创建网站服务器
const app = express()

// 网站维护
// app.use((req, res, next) => {
//     res.send('网站正在维护')
// })
app.use('/admin', (req, res, next) => {
    // 用户没有登录
    let isLogin = false;
    // 如果用户登录
    if (isLogin) {
        // 让用户继续向下执行
        next()
    } else {
        // 如果用户没有登录,直接对客户端做出响应
        res.send("您还没有登录,不能访问/admin页面")
    }

})
app.get('/admin', (req, res) => {
    res.send("您已登录,可以访问当前页面")
})
app.use((req, res, next) => {
    // res.status(404)
    res.send("当前页面不存在")
})


// 监听端口
app.listen(3000)
console.log("网站服务器启动成功")