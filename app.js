const express=require('express');
const bodyParser=require('body-parser');
const pool=require('./pool.js');
const fs=require("fs");
const session = require("express-session");
//创建web服务器
var server=express();
server.use(session({
	secret:"myh",
	resave:false,
	saveUninitialized:true,
	cookie:{
		maxAge:1000*60*60
	}
}))
//引入用户路由器

const cors=require("cors");
server.use(cors({
origin:["http://127.0.0.1:8080","http://127.0.0.1:3000"],
    credentials:true
  }))
server.listen(3000);
//托管静态资源
//handle request entity too large
server.use(bodyParser.json({limit:'50mb'}));
server.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
server.use(express.static('./public'));

//配置中间件

//使用路由器管理路由
//把用户路由器挂载到/user下，访问形式/user/detail


server.post('/reg', (req, res) => {
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
server.post('/login', (req, res) => {
	var obj = req.body;
	var $uname = obj.email;
	var $upwd = obj.upwd;

	pool.query('SELECT * FROM ms_user WHERE email=? AND upwd=?', [$uname, $upwd], (err, result) => {
		if (err) throw err;
		if (result.length > 0) {
			req.session.uid = result[0].uid;
		
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
server.get('/uidlist', (req, res) => {
	 var uid = req.query.uid;
	//获取数据
console.log(uid);
	//执行SQL语句，查询对应的数据--10:13
	pool.query('select * from ms_menu where uid=? order by time desc ', [uid], (err, result) => {
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
server.get('/detail',(req,res)=>{
  //获取数据
  var email=req.query.email;
  //执行SQL语句，查询对应的数据--10:13
  pool.query('SELECT * FROM ms_user WHERE email=?',[email],(err,result)=>{
    if(err) throw err;
    //把查询结果发送到浏览器
	if(result.length>0)
	res.send("1");
	else{res.send("0")}
  }); 
});
server.post('/upload', function(req, res){
    //接收前台POST过来的base64
    var imgData = req.body;
    imgData.time =Date.now();


    // {"craft":"0","taste":"0","diffculty":"0","rtime":"0","ctime":"0","pnum":"0","endp":"file:///D:/mx/msj/public/img/picup.png","story":"","material":[["",""],["",""]],"acc":[["",""],["",""]],"step":[["1","file:///D:/mx/msj/public/img/addbz.png",""],["2","file:///D:/mx/msj/public/img/addbz.png",""]],"finall":"file:///D:/mx/msj/public/img/addbz.png","skill":""}
    // imgData.endp
    var base64Data = imgData.endp.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var imgurl = "fsserver/endp_"+Date.now()+".jpeg";
    var imgurl1 = "public/"+imgurl;
    imgData.endp=imgurl;
     fs.writeFile(imgurl1, dataBuffer,function(err){});
    // imgData.endp
    for(var i = 0;i<imgData.step.length;i++){
    var base64Data = imgData.step[i][1].replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var imgurl = "fsserver/"+(i+1)+"_"+Date.now()+".jpeg"
    imgData.step[i][1]=imgurl
    var imgurl1 = "public/"+imgurl;
     fs.writeFile(imgurl1, dataBuffer,function(err){});}
    var base64Data = imgData.finall.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var imgurl = "fsserver/finall_"+Date.now()+".jpeg";
    var imgurl1 = "public/"+imgurl;
    imgData.finall=imgurl;
     fs.writeFile(imgurl1, dataBuffer,function(err){});
     imgData.material=JSON.stringify(imgData.material);
      imgData.acc=JSON.stringify(imgData.acc);
      imgData.step=JSON.stringify(imgData.step);
    console.log(imgData);
    //INSERT INTO ms_tog (tid, tog, toid) VALUES
    // pool.query('INSERT INTO ms_menu(mid,mtitle,craft,taste,diffculty,rtime,ctime,pnum,endp,story,material,acc,step,finall,skill,tid) VALUES (null,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[imgData.mtitle,imgData.craft,imgData.taste,imgData.diffculty,imgData.rtime,imgData.ctime,imgData.pnum,imgData.endp,imgData.story,imgData.material,imgData.acc,imgData.step,imgData.finall,imgData.skill,imgData.tid],
    pool.query('INSERT INTO ms_menu set ?',[imgData],
    (err,result)=>{
        if(err) throw err;
        //console.log(result);
        if(result.affectedRows>0){
          res.send({code:200,data:'reg suc'});
        }else{
          res.send({code:400,data:'reg err'});
        }
  });
});
server.get('/lest', (req, res) => {
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
server.get('/list', (req, res) => {
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
server.get('/seek', (req, res) => {
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
server.get('/header', (req, res) => {
	
	var sql = "select * from ms_tog ";
	pool.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send({
			data: result
		})

	})
})
server.post('/index', (req, res) => {
	var indexdata = {
	}
	
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





