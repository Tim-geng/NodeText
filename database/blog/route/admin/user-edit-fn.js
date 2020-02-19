// 1.引入joi模块
const Joi = require('joi')
    // 引入user.js下的User 为了验证邮箱是否存在 
    // 通过对象集合的形式把User解析出来
const { User, validateUser } = require('../../model/user')

// 引入加密模块
const bcrypt = require('bcrypt')

module.exports = async(req, res, next) => {

    // 2.定义对象的验证规则
    // 把这段程序剪切到user.js里面了做 公共程序


    //测试路由是否有用
    // res.send('ok')
    try {
        // 实施验证
        // await Joi.validate(req.body, schema)
        // 把此段程序也放在了user.js里面
        // res.send(req.body.role)
        await validateUser(req.body)

    } catch (ex) {
        // 验证没有通过
        // ex.message
        // 重定向回用户添加页面   模板字符串的方式``
        //return res.redirect(`/admin/user-edit?message=${ex.message}`)
        // JSON.stringfy() 将对象数据类型转换为字符串数据类型
        // res.send(ex)
        // res.send(ex + ex.message)
        let str = JSON.stringify({ path: '/admin/user-edit', message: ex.message })
        return next(str)
    }

    // 根据邮箱系统查询用户是否存在
    // 邮箱验证 findOne 因为是唯一存在的
    let user = await User.findOne({ email: req.body.email })
        // 如果用户已经存在 邮箱地址已经被别人占用  用重定向提示用户
    if (user) {
        // 重定向回用户添加页面   模板字符串的方式``
        // return res.redirect(`/admin/user-edit?message=邮箱已经被占用`)
        let str = JSON.stringify({ path: '/admin/user-edit', message: '邮箱已经被占用' })
        return next(str)
    }
    // 对密码进行加密处理
    // 1.生成随机字符串
    const salt = await bcrypt.genSalt(10)

    const passworld = await bcrypt.hash(req.body.passworld, salt)
        // 把req.body.passworld 替换成passworld
    req.body.passworld = passworld
        // 验证是否已经加密
        // res.send(req.body.passworld)

    // 把信息添加到数据库中
    // 调用User下的creat方法
    await User.create(req.body)

    // 10.将页面重定向页面到用户列表页面
    res.redirect('/admin/user')
}