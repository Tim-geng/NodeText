// 用bcrypt进行加密算法  测试代码
// 1.导入bcrypt模板
const bcrypt = require('bcrypt');


async function run() {
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
    console.log(result)
}
run()