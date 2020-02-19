// 导入用户集合构造函数
const { User } = require('../../model/user')
    // 1.导入bcrypt模板
const bcrypt = require('bcrypt');

const login = async(req, res) => {
    // 接收请求参数 req.body 因为是post 用到body-parser
    // res.send(req.body)
    const { email, password } = req.body;
    // 如果客户端的javascript代码被禁止执行,所以在这里进行二次验证
    // 如果用户没有输入邮件地址
    if (email.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或密码有误' })
    }
    if (password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或密码有误' })
    }
    // 根据邮箱地址查询用户信息
    // 如果查询到了用户 user变量的值是对象类型 对象中存储的是用户信息
    // 如果没有查询到用户 user变量为空
    let user = await User.findOne({ email: email })
    if (user) {
        console.log(password)
        console.log(user.passworld)
            // 查询到用户
            // 将客户端传递过来的密码和用户信息中的密码匹配
            // user.passworld :数据库密码
        let isEqual = await bcrypt.compare(password, user.passworld)
        if (isEqual) {
            // 将用户名存储在请求对象中
            // req.username = user.username;
            req.session.username = user.username
                // 登录成功
                // 在req里面拿到的app就是app.js里面的app
            req.app.locals.userInfo = user;
            // console.log(req.app.locals.userInfo)
            // res.send("登录成功")
            // 重定向到用户列表页面
            res.redirect('/admin/user')

        } else {
            // 密码错误
            res.status(400).render('admin/error', { msg: '邮件地址或密码有误' })
        }
    } else {
        // 没有查询到用户
        res.status(400).render('admin/error', { msg: '邮件地址或密码有误' })
    }
}
module.exports = login