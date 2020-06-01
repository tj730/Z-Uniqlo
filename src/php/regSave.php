<?php
    header("content-type:text/html;charset=utf-8");
    // 一、获取前端发送来的数据（用户名和密码）
    $name = $_POST["username"];
    $pass = $_POST["userpass"];
    $sex = $_POST["usersex"];

    // 二、连接数据库进行处理（增？？）
    // 1、连接数据库
    $conn = mysqli_connect("localhost","root","root","2001db");

    // 2、执行sql语句
    
    $result = mysqli_query($conn,"insert into vip values('{$name}','{$pass}','$sex')");    

    // 3、关闭数据库
    mysqli_close($conn);

    // 三、响应(就是使用echo)
    if($result){
        echo "1";
    }else{
        echo "0";
    }
?>