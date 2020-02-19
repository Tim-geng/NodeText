const mongoose = require("mongoose")
    // 创建用户集合规则
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    age: {
        type: String,
        min: 18,
        max: 100
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    hobbies: [String]
})

// 创建集合
const User = mongoose.model("User", UserSchema)

// 开放User
module.exports = User;