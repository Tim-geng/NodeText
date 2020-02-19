const mongoose = require("mongoose")

// 数据库连接 connect  27017 是数据库的默认端口
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("数据库连接成功")
    })
    .catch(err => {
        console.log("数据库连接失败", err)
    })