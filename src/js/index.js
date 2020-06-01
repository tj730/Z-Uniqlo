//选项卡的切换
$(".tab").find("li").click(function(){
    // 先取消所有，再给当前加

    // 先给当前加，然后取消其他兄弟
    // 此处的this，默认找到的是原生js的DOM对象
    // console.log(this);
    // 如果想使用jq的方法，需要先转成jq的DOM对象

    $(this).addClass("hot").siblings().removeClass("hot");

    // 获取当前点击元素的索引
    // console.log($(this).index());

    $(".cont").children("div").css("display","none").eq($(this).index()).css("display","block");

})




//轮播图1
window.onload = function () {
    let s1 = new Slider(document.getElementById("sbanner"), {
        imgs: ["img/警告.png","img/新人礼券.png"],
        isCircle: false,
        timeLong: 5000
    });

}



//回到顶部
$(function () {
    $(".hot-top").click(function () {
        $("html").animate({
            scrollTop: 0,
        })
    })
    $(document).scroll(function () {
        var distance = $(document).scrollTop();
        // 　　 console.log(distance);

        if (distance > 1000) {
            // console.log("aaaa");
            $(".hot-top").css("display","block")
        }else{
            $(".hot-top").css("display","none")
        }
    })
})

