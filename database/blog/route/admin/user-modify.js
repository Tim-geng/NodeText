// 因为要进行密码验证,所以要用到User.js下的验证函数
const { User } = require('../../model/user')
const bcrypt = require('bcrypt')


module.exports = async(req, res, next) => {
    // 获取客户端传递过来的请求参数

    const body = req.body
        // 因为id是通过get方式传递过来的,所以不能在req.body里面
        // 获取客户端传递过来的id
    const id = req.query.id
    const passworld = body.passworld

    // 返回user页面,就要把登录模板给他
    // res.render('admin/login')
    // 用集合User下的findOne进行用户查询
    let user = await User.findOne({ _id: id })
        // res.send(user)
        // 进行密码比对  --- 用到 bcrypt
    let isBoolean = await bcrypt.compare(req.body.passworld, user.passworld)
    if (isBoolean) {
        // 如果为真,密码比对成功
        // res.send('密码比对成功')
        // 将用户信息更新到数据库中
        // 用到用户集合updateOne方法 1.条件 2.信息
        await User.updateOne({ _id: id }, {
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            state: req.body.state
        });
        // 页面的重定向 ---用户列表页面
        res.redirect('/admin/user')

    } else {
        // 如果为假,密码比对失败
        // res.send('密码比对失败')
        // 用到app.js错误处理中间件
        let obj = { path: '/admin/user-edit', message: '密码比对失败,不能进行修改信息提交', id: id }
        let str = JSON.stringify(obj)
        next(str)

    }
}