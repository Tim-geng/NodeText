// 引入mongoose
const mongoose = require('mongoose')
    // 创建学生集合规则
const studentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        min: 10,
        max: 25
    },
    sex: {
        type: String,
    },
    email: {
        type: String
    },
    hobbies: [String],
    collage: String,
    enterDate: {
        type: Date,
        default: Date.now
    }
});

// 创建集合 用mongoose.mode  可以返回集合的构造函数 
// 通过构造函数进行操作
const Student = mongoose.model('Student', studentsSchema);

const user = new Student({
        name: "周冬雨",
        age: "24",
        sex: "1",
        email: "123456@qq.com",
        hobbies: ["敲代码"]
    })
    // user.save()

// 要在其他地方用到Student,所以要把它释放出去 用module.exports
module.exports = Student;