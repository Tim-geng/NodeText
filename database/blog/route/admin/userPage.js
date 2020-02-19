// 引用数据库中User
// 导入用户集合构造函数
const { User } = require("../../model/user")
module.exports = async(req, res) => {
    // 接收客户端传递过来的当前页参数
    let page = req.query.page || 1
        // res.send(page); return;
        // 每一页显示的数据条数
    let pagesize = 3;
    // 查询用户数据的总数
    let count = await User.countDocuments({})
        // 总页数
    let total = Math.ceil(count / pagesize)

    // 页码对应的数据查询开始位置
    let start = (page - 1) * pagesize;

    // 将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start)


    // res.send(users)

    // 返回user页面,就要把登录模板给他
    // 渲染用户列表模块
    res.render('admin/user', {
            users: users,
            page: page,
            total: total
        })
        // , {msg: req.session.username}
}