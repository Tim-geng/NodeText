// 引入mongoose第三方模块
const mongoose = require('mongoose')
    // 1.导入bcrypt模板
const bcrypt = require('bcrypt');

// 1.引入joi模块
const Joi = require('joi')


// 设定用户集合规格
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true
    },
    passworld: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    // default:启用状态 0,
    // default:禁用状态 1
    state: {
        type: Number,
        default: 0
    }


});

// 创建集合
const User = mongoose.model('User', userSchema)

// 创建User集合例子
// User.create({
//     username: "周冬雨",
//     email: "3334@qq.com",
//     passworld: "123",
//     role: "admin",
//     // default:启用状态 0,
//     // default:禁用状态 1
//     state: 0
// }).then(() => {
//     console.log('用户创建成功')
// }).catch(() => {
//     console.log('用户创建失败')
// })

// 2.用bcrypt进行密码加密操作
async function creatUser() {
    // 2.生成随机字符串 盐
    // 2.1 genSalt方法接收一个数值作为参数
    // 2.2 数值越大  生成的随机字符串复杂度越高
    // 2.3 数值越小  生成的随机字符串复杂度越低
    // 默认值是10   这是一个promiss对象
    // 返回生成的随机字符串
    const salt = await bcrypt.genSalt(10)
        // console.log(salt)
        // 对密码进行加密
        // 1.要进行加密的原文(明文)
        // 2.随机字符串
        // 返回值是加密后的密码
    const result = await bcrypt.hash('123', salt);

    const userpass = User.create({
        username: "周冬雨",
        email: "11111@qq.com",
        passworld: result,
        role: "admin",
        // default:启用状态 0,
        // default:禁用状态 1
        state: 0
    })
    console.log(userpass)
}
// creatUser()

// 验证用户user信息
const validateUser = user => {
    // 2.定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('username属性没有通过验证')),
        email: Joi.string().email().required().error(new Error('email属性没有通过验证')),
        passworld: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码格式不正确')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色不正确')),
        state: Joi.number().valid(0, 1).error(new Error('状态值不正确'))

    }
    return Joi.validate(user, schema)
}

// 开放用户集合 作为模块成员进行导出
module.exports = {
    User: User,
    validateUser: validateUser
}