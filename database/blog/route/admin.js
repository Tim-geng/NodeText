// 登录路由

// 引用express框架
const express = require('express')


// 创建博客展示页面路由
const admin = express.Router();

// 导入用户集合构造函数
const { User } = require('../model/user')
    // 渲染登录页面
admin.get('/login', require('../route/admin/loginPage'))

// 渲染用户列表路由
// 1.user 创建用户列表路由
admin.get('/user', require('../route/admin/userPage'))
    // 2.
admin.get('/article-edit', require('../route/admin/articleEdit'))
    // 3.
admin.get('/article', require('../route/admin/article'))

// 创建退出功能路由
admin.get('/logout', require('../route/admin/logout'))
    // 实现登录功能
admin.post('/login', require('../route/admin/login'))
    // 创建用户编辑页面路由
admin.get('/user-edit', require('../route/admin/userEdit'))
    // 创建用户编辑页面---用户添加功能路由
admin.post('/user-edit', require('../route/admin/user-edit-fn'))

// 创建用户信息修改路由---用户修改信息功能
admin.post('/user-modify', require('../route/admin/user-modify'))

// 删除用户功能路由
admin.get('/delete', require('../route/admin/user-delete'))
    // 将路由对象做为模块成员进行导出
module.exports = admin;