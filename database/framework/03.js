// 引入express框架
const express = require('express')
    // 创建网站服务器
const app = express()

app.use((req, res, next) => {
    console.log("请求走了app.use中间件")
    next();
})
app.use('/request', (req, res, next) => {
    console.log('请求走了app.use/request中间件')
    next();
})

app.get('/request', (req, res, next) => {
    req.name = "张三";
    next();
})
app.get('/request', (req, res) => {
    res.send(req.name)

})
app.get('/list', (req, res) => {
    res.send('list')

})


// 监听端口
app.listen(3000)
console.log("网站服务器启动成功")