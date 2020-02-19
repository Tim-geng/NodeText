// 1.新建一个app.js文件后,在windows PowerShell里 npm install express
// 2.引入express框架,这样可以快速搭建网站服务器
const express = require('express')
    // 3.引用系统模块path----处理静态资源文件夹目录
const path = require('path')
    // 4.调用express() 创建web服务器
const app = express();

// 5.静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')))

// 7.创建好客户端请求文件 01-Ajax.html 后
// 创建路由,请求方式get,请求地址http://localhost:3000/first
app.get('/first', (req, res) => {
        res.send('hell ajax')
    })
    // 创建路由,请求方式get,请求地址http://localhost:3000/responseData
app.get('/responseData', (req, res) => {
    // res.send('responseData')
    // 响应json数据
    res.send({
        'name': '张三',
        age: 18
    })
})

app.get('/get', (req, res) => {
    // 接收get请求用req.query
    res.send(req.query)

})
app.post('/post', (req, res) => {
    // 接收post请求 用req.body
    res.send(req.body)

})




// 6.监听端口
app.listen(3000);

console.log('服务器启动成功')