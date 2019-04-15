$.ajax({
    url: "http://localhost:3000/header",
    type: "get",
    //data: data,
    dataType: "json", //自动JSON.parse(),
    success: function (data) {
        //console.log(data);
        var data=data.data;
        html7=`<div id="header">
    <div>
        <div id="logo"><img height="100px" src="img/logo.png" alt=""></div>
        <div id="select"><input type="text" placeholder="请输入菜谱">
            <button id="selbut" onclick="sel()">搜索</button>
        </div>`
		console.log(sessionStorage.getItem("uid"))
		if(sessionStorage.getItem("uid")!=null){
		html7+=`
        <div id="login">
           
            <a href="add1.html">上传菜谱</a>
			 <a onclick="esc()" href="javascript:;">退出</a>
			
        </div>`
		}else{
			html7+=` <div id="login">
			 <a href="login.html">登录</a>
			<a href="reg1.html">注册</a>
			 </div>`
		}
		
    html7+=`</div>
</div>
<div id="nav">
    <ul>
        <li>
            <a href="index.html">首页</a>
        </li>
        <li class="bg ">
            <a class="jc" href="#">家常菜谱</a>

            <div class="navhidden fl">
                <ul>`
                    
                for(var i=0;i<data.length;i++){
                        if(data[i].toid==1){
                        html7+= `<li>
                        <a href="http://127.0.0.1:3000/list.html?tid=${data[i].tid}">${data[i].tog}</a>
                    </li>`
                        }
                    }
                    html7+= `
                </ul>
            </div>
        </li>
        <li class="bg">
            <a class="jc" href="#">中华菜系 </a>

            <div class="navhidden fl">
                <ul>`
                        for(var i=0;i<data.length;i++){
                        if(data[i].toid==2){
                        html7+= `<li>
                        <a href="http://127.0.0.1:3000/list.html?tid=${data[i].tid}">${data[i].tog}</a>
                    </li>`
                        }
                    }
                    html7+= `
                </ul>
            </div>
        </li>
        <li class="bg">
            <a class="jc" href="#">各地小吃</a>

            <div class="navhidden fl">
                <ul>`
                        for(var i=0;i<data.length;i++){
                        if(data[i].toid==3){
                        html7+= `<li>
                        <a href="http://127.0.0.1:3000/list.html?tid=${data[i].tid}">${data[i].tog}</a>
                    </li>`
                        }
                    }
                    html7+= `

                </ul>
            </div>
        </li>
        <li class="bg">
            <a class="jc" href="#">国外菜谱</a>

            <div class="navhidden fl">
                <ul>`
                        for(var i=0;i<data.length;i++){
                        if(data[i].toid==4){
                        html7+= `<li>
                        <a href="http://127.0.0.1:3000/list.html?tid=${data[i].tid}">${data[i].tog}</a>
                    </li>`
                        }
                    }
                    html7+= `
                    
                </ul>
            </div>
        </li>
        <li class="bg">
            <a class="jc" href="#">烘焙</a>

            <div class="navhidden fl">
                <ul>`
                        for(var i=0;i<data.length;i++){
                        if(data[i].toid==5){
                        html7+= `<li>
                        <a href="http://127.0.0.1:3000/list.html?tid=${data[i].tid}">${data[i].tog}</a>
                    </li>`
                        }
                    }
                    html7+= `

                </ul>
            </div>
        </li>
    </ul>
</div>`;
$("#headerr").append(html7);
    }
})
function esc(){
	
	sessionStorage.clear()
	history.go(0);	
}
function sel(){
	var inp = $("#select>input").val();
	if(inp==""){return}
	window.location.href = "http://127.0.0.1:3000/listt.html?id="+inp;
}