//创建连接池，哪一个模块需要连接，只需要引入此模块即可
const mysql=require('mysql');
var pool=mysql.createPool({
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'',
  database:'msj',
  connectionLimit:20
});
//导出连接池对象pool
module.exports=pool;
