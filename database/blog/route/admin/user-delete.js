const { User } = require('../../model/user')
module.exports = async(req, res) => {
    // 返回user页面,就要把登录模板给他
    // res.render('admin/article')
    // 1--获取要删除的用户id
    // res.send(req.query.id)
    // 2-根据id删除用户---1:查询条件,2:
    await User.findOneAndDelete({ _id: req.query.id })
        // 3- 重定向到用户列表页面
    res.redirect('/admin/user')


}