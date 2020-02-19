// 1.搭建网站服务器,实现客户端与服务器端的通信
// 2.连接数据库,创建用户集合,向集合中插入文档(借助第三方模块mongoose)

// 3.当用户访问/list时,将所有用户信息查询出来
// 3.1实现路由功能
// 3.2 呈现用户列表页面
// 3.3 从数据库中查询用户信息,将用户信息展示在列表中

// 4.将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 5.当用户访问/add时,呈现表单页面,并实现添加用户信息功能

// 6.当用户访问/modify时,呈现修改页面,并实现修改用户信息功能
// 6.1增加页面路由,呈现页面
// 6.1.1在点击修改按钮的时候,将用户ID传递到当前页面
// 6.1.2从数据库中查询当前用户信息,将用户信息展示到页面中
// 6.2实现用户修改功能
// 6.2.1指定表单的提交地址以及请求方式
// 6.2.2接收客户端传递过来的修改信息,找到用户,将用户信息更改为最新的

// 7.当用户访问/delete时,实现用户删除功能

const http = require('http');

const url = require("url")
const querystring = require('querystring')
require('./model/index.js');
const User = require('./model/user.js');


// 创建文档  --返回一个实例对象
const user = new User({
        name: "周冬雨",
        age: "24",
        password: "1234",
        email: "123456@qq.com",
        hobbies: ["吃饭", "打豆豆"]
    })
    // 实例对象进行保存
    // user.save();

// 创建服务器
const app = http.createServer();
// 为服务器对象添加请求事件
app.on("request", async(req, res) => {
        // 开启当前服务  nodemon app.js
        // 3.1实现路由功能 请求方式
        const method = req.method;
        // 获取请求地址 --是带get的地址 要纯粹的url 所以导入url模块  query变为对象类型
        const { pathname, query } = url.parse(req.url, true);
        // 判断请求方式  GET页面一般都是数据的请求或页面的成立
        if (method == "GET") {
            // 3.2呈现用户列表页面
            // 3.3 从数据库中查询用户信息,将用户信息展示在列表中
            let users = await User.find() //await只能出现在异步中 所以加了async find()是呈现为数组,findOne()是呈现为对象格式

            if (pathname == '/list') {
                // html字符串
                let list = `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<title>用户列表</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
				</head>
				<body>
					<div class="container">
						<h6>
							<a href="/add" class="btn btn-primary">添加用户</a>
						</h6>
						<table class="table table-striped table-bordered">
							<tr>
								<td>用户名</td>
								<td>年龄</td>
								<td>爱好</td>
								<td>邮箱</td>
								<td>操作</td>
							</tr>
			`;

                // 对数据进行循环操作
                users.forEach(item => {
                    list += `
					<tr>
						<td>${item.name}</td>
						<td>${item.age}</td>
						<td>
				`;

                    item.hobbies.forEach(item => {
                        list += `<span>${item}</span>`;
                    })

                    list += `</td>
						<td>${item.email}</td>
						<td>
							<a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
							<a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
						</td>
					</tr>`;
                });

                list += `
						</table>
					</div>
				</body>
				</html>
			`;

                res.end(list)
            } else if (pathname == '/add') {
                let add = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>用户列表</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
                </head>
                <body>
                    <div class="container">
                        <h3>添加用户</h3>
                        <form method="post" action="/add">
                          <div class="form-group">
                            <label>用户名</label>
                            <input name="name"type="text" class="form-control" placeholder="请填写用户名">
                          </div>
                          <div class="form-group">
                            <label>密码</label>
                            <input name="password" type="password" class="form-control" placeholder="请输入密码">
                          </div>
                          <div class="form-group">
                            <label>年龄</label>
                            <input name="age"type="text" class="form-control" placeholder="请填写邮箱">
                          </div>
                          <div class="form-group">
                            <label>邮箱</label>
                            <input name="email" type="email" class="form-control" placeholder="请填写邮箱">
                          </div>
                          <div class="form-group">
                            <label>请选择爱好</label>
                            <div>
                                <label class="checkbox-inline">
                                  <input type="checkbox" value="足球" name="hobbies"> 足球
                                </label>
                                <label class="checkbox-inline">
                                  <input type="checkbox" value="篮球" name="hobbies"> 篮球
                                </label>
                                <label class="checkbox-inline">
                                  <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                                </label>
                                <label class="checkbox-inline">
                                  <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                                </label>
                                <label class="checkbox-inline">
                                  <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                                </label>
                                <label class="checkbox-inline">
                                  <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
                                </label>
                                <label class="checkbox-inline">
                                  <input type="checkbox" value="烫头" name="hobbies"> 烫头
                                </label>
                            </div>
                          </div>
                          <button type="submit" class="btn btn-primary">添加用户</button>
                        </form>
                    </div>
                </body>
                </html>`
                res.end(add)
            } else if (pathname == '/modify') {
                let user = await User.findOne({ _id: query.id });
                let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头', '吃饭', '睡觉', '打豆豆']
                console.log(user)
                    // 呈现修改用户表单页面
                let modify = `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<title>用户列表</title>
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
				</head>
				<body>
					<div class="container">
						<h3>修改用户</h3>
						<form method="post" action="/modify?id=${user._id}">
						  <div class="form-group">
						    <label>用户名</label>
						    <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写用户名">
						  </div>
						  <div class="form-group">
						    <label>密码</label>
						    <input value="${user.password}" name="password" type="password" class="form-control" placeholder="请输入密码">
						  </div>
						  <div class="form-group">
						    <label>年龄</label>
						    <input value="${user.age}" name="age" type="text" class="form-control" placeholder="请填写邮箱">
						  </div>
						  <div class="form-group">
						    <label>邮箱</label>
						    <input value="${user.email}" name="email" type="email" class="form-control" placeholder="请填写邮箱">
						  </div>
						  <div class="form-group">
						    <label>请选择爱好</label>
						    <div>
						    	
						    
			`;

                hobbies.forEach(item => {
                    // 判断当前循环项在不在用户的爱好数据组
                    let isHobby = user.hobbies.includes(item);
                    if (isHobby) {
                        modify += `
						<label class="checkbox-inline">
						  <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
						</label>
					`
                    } else {
                        modify += `
						<label class="checkbox-inline">
						  <input type="checkbox" value="${item}" name="hobbies"> ${item}
						</label>
					`
                    }
                })

                modify += `
						    </div>
						  </div>
						  <button type="submit" class="btn btn-primary">修改用户</button>
						</form>
					</div>
				</body>
				</html>
			`;
                res.end(modify) //把变量响应给客户端
            } else if (pathname == '/remove') {
                await User.findOneAndDelete({ _id: query.id });
                // 重定向
                res.writeHead(301, {
                    Location: '/list'
                });
                res.end()
            }

        } else if (method == "POST") {
            // 用户添加功能
            if (pathname == "/add") {
                // 接收用户提交的信息
                let formData = '';
                // 接收post参数
                req.on('data', param => {
                        formData += param;
                    })
                    // post参数接收完毕
                req.on('end', async() => {
                    // 用querystring的parse方把格式转换为对象形式
                    let user = querystring.parse(formData);
                    // 将用户提交的信息添加到数据库中 await 变为同步的形式
                    await User.create(user)
                        // 301 代表重定向
                        // Location : 跳转地址
                    res.writeHead(301, {
                            Location: '/list'
                        })
                        // 当前客户端已经结束
                    res.end()
                })
            } else if (pathname == "/modify") {
                // 接受用户提交的信息
                let formData = '';
                // 接受post参数
                req.on('data', param => {
                        formData += param;
                    })
                    // post参数接受完毕
                req.on('end', async() => {
                    let user = querystring.parse(formData)
                        // 将用户提交的信息添加到数据库中
                    await User.updateOne({ _id: query.id }, user);
                    // 301代表重定向
                    // location 跳转地址
                    res.writeHead(301, {
                        Location: '/list'
                    });
                    res.end();
                })
            }
        }

    })
    // 监听端口
app.listen(3000);