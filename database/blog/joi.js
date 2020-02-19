// 1.引入joi模块
const Joi = require('joi')
    // 2.定义对象的验证规则
const schema = {
    usename: Joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证')),
    birth: Joi.number().min(1900).max(2020).error(new Error('birth没有通过验证'))

}

// ==========================================
// 测试代码
async function run() {
    try {
        // 3.实施验证
        await Joi.validate({ usename: 'ab' }, schema)
    } catch (ex) {
        console.log(ex.message)
        return;
    }
    console.log("验证通过")
}
// run()