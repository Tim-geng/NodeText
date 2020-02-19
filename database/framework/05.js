// 引入express框架
const express = require('express')
    // 创建网站服务器
const app = express()

app.get('/index', (req, res) => {
        throw new Error('程序发生了未知错误')
            // res.send("程序正常执行")
    })
    // 错误处理中间
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})

// 监听端口
app.listen(3000)
console.log("网站服务器启动成功")