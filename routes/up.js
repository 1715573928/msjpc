const express=require('express');
//引入连接池模块
const session=require('../app.js');
const pool=require('../pool.js');
//创建空的路由器对象
const fs=require("fs");
var router=express.Router();
//添加路由

router.post('/upload', function(req, res){
    //接收前台POST过来的base64
    var imgData = req.body;
    imgData.time =Date.now();
	//console.log(session.uid);
	//imgData.uid =req.session.uid;
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
//
// router.post('/reg',(req,res)=>{
 
// });
//
// router.get('/detail',(req,res)=>{
//   //获取数据
//   var email=req.query.email;
//   //执行SQL语句，查询对应的数据--10:13
//   pool.query('',[],(err,result)=>{
//     if(err) throw err;
//     //把查询结果发送到浏览器

// 	res.send("");

//   }); 
// });
//

//导出路由器
module.exports=router;