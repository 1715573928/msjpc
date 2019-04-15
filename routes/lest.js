const express = require('express');
const session=require('../app.js');
//引入连接池模块
const pool = require('../pool.js');
//创建空的路由器对象
var router = express.Router();
//添加路由

router.get('/lest', (req, res) => {
	var mid = req.query.mid;
	
	var sql = "UPDATE `ms_menu` SET dianj=dianj+1 WHERE mid = ?";
	pool.query(sql, [mid], (err, result) => {
		if (err) console.log(err);
		var sql = "select * from ms_menu where mid=?";
		pool.query(sql,[mid],(err,result)=>{
			if (err) console.log(err);
			res.send({
				data: result
			})
		})
		

	})
})
//pc端
router.get('/list', (req, res) => {
	var data = {};
	var tid = req.query.tid;
	var pag = 1;
	if (req.query.pag != undefined) {
		pag = req.query.pag
	}
	if (req.query.arrtid != 'undefined') {
		var sql = "select arrt from ms_arrt where aid=?";
		pool.query(sql, [req.query.arrtid], (err, result) => {
			if (err) console.log(err);
			console.log(result[0].arrt);
			var a = result[0].arrt;
			console.log(a);
			var sql = `select * from ms_menu where tid=? and (craft="${result[0].arrt}" or taste="${result[0].arrt}" or diffculty="${result[0].arrt}" or rtime="${result[0].arrt}" or ctime="${result[0].arrt}" or pnum="${result[0].arrt}") limit ?,12`;
			console.log(sql);
			console.log(tid);
			pool.query(sql, [tid, (pag - 1) * 12], (err, result) => {
				if (err) console.log(err);
				data.list = result;
				console.log(result)
				sql = "select toid from ms_tog where tid=?";
				pool.query(sql, [tid], (err, result) => {
					if (err) console.log(err);
					data.lt = result;
					var sql = `select tid from ms_menu where tid=? and (craft="${a}" or taste="${a}" or diffculty="${a}" or rtime="${a}" or ctime="${a}" or pnum="${a}") `;
		pool.query(sql, [tid], (err, result) => {
			if (err) console.log(err);
			data.mus = result.length;
					res.send({
						data: data
					
					})})
					})
			})
		})
	} else {
		var sql = "select tid from ms_menu where tid=?";
		pool.query(sql, [tid], (err, result) => {
			if (err) console.log(err);
			data.mus = result.length;
			var sql = "select * from ms_menu where tid=? limit ?,12";
			pool.query(sql, [tid, (pag - 1) * 12], (err, result) => {
				if (err) console.log(err);
				data.list = result;
				sql = "select toid from ms_tog where tid=?";
				pool.query(sql, [tid], (err, result) => {
					if (err) console.log(err);
					data.lt = result;
					res.send({
						data: data
					})

				})
			})
		})
	}
})
//搜索
router.get('/seek', (req, res) => {
	var data = {};
	var name = req.query.name;
	var pag = 1;
	if (req.query.pag != undefined) {
		pag = req.query.pag
	}
	if (req.query.arrtid != 'undefined') {
		var sql = "select arrt from ms_arrt where aid=?";
		pool.query(sql, [req.query.arrtid], (err, result) => {
			if (err) console.log(err);
			console.log(result[0].arrt);
			var a = result[0].arrt;
			console.log(a);
			var sql = `select * from ms_menu where mtitle like "%${name}%" and (craft="${result[0].arrt}" or taste="${result[0].arrt}" or diffculty="${result[0].arrt}" or rtime="${result[0].arrt}" or ctime="${result[0].arrt}" or pnum="${result[0].arrt}") limit ?,12`;
			console.log(sql);
		
			pool.query(sql, [ (pag - 1) * 12], (err, result) => {
				if (err) console.log(err);
				data.list = result;
				console.log(result)
			
				
					var sql = `select tid from ms_menu where mtitle like "%${name}%"  and (craft="${a}" or taste="${a}" or diffculty="${a}" or rtime="${a}" or ctime="${a}" or pnum="${a}") `;
		pool.query(sql, (err, result) => {
			if (err) console.log(err);
			data.mus = result.length;
					res.send({
						data: data
					
					})})
					
			})
		})
	} else {
		var sql = `select tid from ms_menu where mtitle like '%${name}%'`;
		pool.query(sql, (err, result) => {
			if (err) console.log(err);
			data.mus = result.length;
			var sql = `select * from ms_menu where mtitle like '%${name}%' limit ?,12`;
			pool.query(sql, [(pag - 1) * 12], (err, result) => {
				if (err) console.log(err);
				data.list = result;
				
					res.send({
						data: data
					})

				
			})
		})
	}
})
router.get('/header', (req, res) => {
	
	var sql = "select * from ms_tog ";
	pool.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send({
			data: result
		})

	})
})
//var sql = "select * from ms_menu where tid=? limit ?,12";
//			pool.query(sql, [tid, (pag - 1) * 12], (err, result) => {
//					if(err) console.log(err);
//					data.list = result;
//					sql = "select toid from ms_tog where tid=?";
//					pool.query(sql, [tid, (err, result) => {
//							if(err) console.log(err);
//							data.lt = result;
//							res.send({
//								data: data
//							})
//
//						})
//
//					})
//			})
//
//

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