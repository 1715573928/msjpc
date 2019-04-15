const express = require('express');
const session = require('../app.js');
//引入连接池模块
const pool = require('../pool.js');
//创建空的路由器对象
var router = express.Router();
//添加路由

//1.用户注册
router.post('/reg', (req, res) => {
	var obj = req.body;
	pool.query('INSERT INTO ms_user (email,upwd)values(?,?)', [obj.email, obj.upwd], (err, result) => {
		if (err) throw err;
		console.log(result);
		if (result.affectedRows > 0) {
			res.send({
				code: 200,
				msg: 'reg suc'
			});
		} else {
			res.send({
				code: -1
			});
		}
	});
});
//3.用户登录
router.post('/login', (req, res) => {
	var obj = req.body;
	var $uname = obj.email;
	var $upwd = obj.upwd;
	console.log(obj);
	pool.query('SELECT * FROM ms_user WHERE email=? AND upwd=?', [$uname, $upwd], (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			session.uid = result[0].uid;
			console.log(session);
			res.send({
				code: 200,
				data: result
			});
		} else {
			res.send({
				code: -1,
				msg: 'login err'
			});
		}
	});
});
//2.检索用户
router.get('/uidlist', (req, res) => {
	req.uid = 7;
	//获取数据
	console.log(session);
	//执行SQL语句，查询对应的数据--10:13
	pool.query('select * from ms_menu where uid=? order by time desc limit 0,8 ', [req.uid], (err, result) => {
		if (err) throw err;
		//把查询结果发送到浏览器
		if (result.length > 0)
			res.send({
				code: 200,
				data: result
			});
		else {
			res.send({
				code: -1,
				data: ""
			})
		}
	});
});
//导出路由器
module.exports = router;
