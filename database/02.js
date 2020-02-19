// 引入mongoose第三方模块,用来操作数据库
const mongoose = require('mongoose');
// 数据库连接
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    // 连接成功
    .then(() => console.log('数据库连接成功'))
    // 连接失败
    .catch(err => console.log('数据库连接失败', err))

// 创建集合规则
const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        isPublished: Boolean
    })
    // 使用集合创建集合  --构造函数
    // 1.参数:集合名称
    // 2.参数:集合规则 -- Schema实例对象
const Course = mongoose.model('Course', courseSchema) //courses

// 创建文档  --返回一个实例对象
const course = new Course({
        name: "姓名1",
        author: "作者1",
        isPublished: true
    })
    // 实例对象进行保存
course.save();