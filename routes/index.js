const express = require('express');
const session=require('../app.js');
//引入连接池模块
const pool = require('../pool.js');
//创建空的路由器对象
var router = express.Router();
//添加路由

router.post('/index', (req, res) => {
	var indexdata = {
	}
	console.log(session);
	var sql = "select * from ms_menu order by time desc limit 0,8 ";
	pool.query(sql, (err, result) => {
		if(err) console.log(err);
		indexdata.menutime = result;
		sql = "select * from ms_menu order by dianj desc limit 0,8 ";
		pool.query(sql, (err, result) => {
			if(err) console.log(err);
			indexdata.menudianj = result;

			sql = "select * from ms_menu where tid = 24 order by dianj desc limit 0,3 ";
			pool.query(sql, (err, result) => {
				if(err) console.log(err);
				indexdata.zaocan = result;
				sql = "select * from ms_menu where tid = 25 order by dianj desc limit 0,3 ";
				pool.query(sql, (err, result) => {
					if(err) console.log(err);
					indexdata.wucan = result;
					sql = "select * from ms_menu where tid = 19 order by dianj desc limit 0,3 ";
					pool.query(sql, (err, result) => {
						if(err) console.log(err);
						indexdata.wancan = result;
						sql = "select * from ms_menu where tid = 21 order by dianj desc limit 0,3 ";
						pool.query(sql, (err, result) => {
							if(err) console.log(err);
							indexdata.yexiao = result;
							sql = "select * from ms_menu where tid = 51 order by dianj desc limit 0,3 ";
							pool.query(sql, (err, result) => {
								if(err) console.log(err);
								indexdata.xiawucha = result;
								res.send({
									data: indexdata
								})
							})
						})
					})
				})
			})
		})
	})
})

//router.get('/index',(req,res)=>{
////获取post请求的数据
////var obj=req.body;
////console.log(obj);
////验证数据是否为空
////执行SQL语句，以用户名和密码为条件查询数据，查看结果
//pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{
//  if(err) throw err;
//	//console.log(result);
//	//判断是否登录成功，根据数组的长度
//	if(result.length>0){
//	  res.send({code:200,data:'login suc'});
//	}else{
//	  res.send({code:301,msg:'err'});
//	}
//});
//});

//导出路由器
module.exports = router;