let isCheck = {
    user:false,
    pass:false,
    pass2:false
};
let hasUser = true; //后端是否存在该用户名
window.onload = function () {
    $("#userId").onblur = function () {
        // 1、前端的验证（格式）
        if(checkUserFront()){
            // 2、后端验证（存在性）
            checkUserBack();
        }
    }
     // 密码验证
    $("#passId").onblur = function () {  
        checkPass();
    }
    
    $("#passId").onchange = function(){
        $("#pass2Id").value = "";
        $("#pass2Id").nextElementSibling.innerHTML = "";
    }

     // 确认密码验证
    $("#pass2Id").onblur = function () {
       checkPass2();
    }

    // 注册
    $("#btnReg").onclick = function () {
        let trueCount = 0;
        for(let key in isCheck){
            if(isCheck[key]){ trueCount++;}
        }
        console.log("trueCount",trueCount);

        // 保证前端验证没有问题
        if(trueCount==3){
            if(!hasUser){
                regSave();
                return;
            }
        }            
        alert("亲，请检查您的信息是否输入完整或者是否正确");            
    }
}

function checkUserFront() {
    let userIdDom = $("#userId");
    // 用户名的规则：非空，长度在6-18位；由数字，字母下划线；
    let reg = /^\w{6,18}$/;
    if (reg.test(userIdDom.value)) {
        isCheck.user = true;
        return true;
    } else {
        userIdDom.nextElementSibling.innerHTML = "×,亲，用户名规则：长度在6-18位；由数字，字母下划线";
        isCheck.user = false;
        return false;
    }
}

function checkUserBack() {
    ajax({
        url: "checkUser.php",
        params: "username=" + $("#userId").value,
        isAsync:false,
        cb: (result) => {
            if (result == "1") {
                $("#userId").nextElementSibling.style.color = "red";
                $("#userId").nextElementSibling.innerHTML = "该用户名已经存在";
                hasUser = true;
            } else {
                $("#userId").nextElementSibling.style.color = "green";
                $("#userId").nextElementSibling.innerHTML = "用户名没有人使用，赶紧注册吧！";
                hasUser = false;
            }
        }
    });
}

function checkPass(){
        let passDom = $("#passId");
        let passSpan = $("#pass-box").children;
        for(let i=0;i<passSpan.length;i++){
            passSpan[i].style.backgroundColor="white";
        }            
        // 密码的规则：长度在6-18位，数字字母下划线组成
        let reg = /^\w{6,18}$/;
        if (reg.test(passDom.value)) {
            passDom.nextElementSibling.innerHTML = "√";                
            isCheck.pass = true;

            //1、统计字符类型的个数
            let regLetter = /[a-zA-Z]/;
            let regNum = /[0-9]/;  //数字
            // let regLine = /[_]/;  //划线
            count = 0;
            if(regLetter.test(passDom.value)) {
                count++;
            }
            if (regNum.test(passDom.value)){
                count++;
            }
            if (regLine.test(passDom.value)){
                count++;
            }
            switch(count){
                // 强：三种字符
                case 3:passSpan[2].style.backgroundColor="green";
                // 中：两种字符
                case 2:passSpan[1].style.backgroundColor="yellow";
                  // 弱：一种字符
                case 1:passSpan[0].style.backgroundColor="red" ;
                default:;
            }

        } else {    
            isCheck.pass = false;
            passDom.nextElementSibling.innerHTML = "×";
        }
}

function checkPass2(){
    let pass2Dom = $("#pass2Id");
    if(pass2Dom.value===$("#passId").value){
        isCheck.pass2 = true;
        pass2Dom.nextElementSibling.innerHTML = "√";                
    }else{
        isCheck.pass2 = false;
        pass2Dom.nextElementSibling.innerHTML = "×";
    }
}

function regSave() {
    let sexDoms = document.getElementsByName("sex");
    let sex = "女";
    if (sexDoms[1].checked) {
        sex = "男";
    }
    let str = `username=${$("#userId").value}&userpass=${$("#passId").value}&usersex=${sex}`;
    ajax({
        method: "post",
        url: "regSave.php",
        params: str,
        cb: (result) => {
            if (result == "1") {
                $("#message-box").innerHTML = "恭喜您，注册成功！请<a href='denglu.html'>登录</a>";
            } else {
                $("#message-box").innerHTML = "不好意思，注册失败！";
            }
        }
    });
}