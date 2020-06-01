 // 一、定义类（轮播图）
 class Slider {
    constructor(boxDom, obj) {    
        // dom相关属性        
        this.boxDom = boxDom;
        this.imgBox=null; //图片容器
        this.imgDoms=[]; // 图片数组
        this.douBox = null;//分页器（豆豆）的容器
        this.douDoms = []; //豆豆的数组
        this.leftArrow = null;//左箭头
        this.rightArrow = null;//右箭头

        // 属性
        let defaultObj = {
            width: this.boxDom.offsetWidth,
            height: this.boxDom.offsetHeight,
            imgs: ["img/b1.jpg", "img/b2.jpg", "img/b3.jpg"],

            // 分页器相关属性
            douWidth: 20,
            douHeight: 20,
            isCircle: true,
            color: "pink",
            highColor: "blue",
            douPos: "bottom",

            ord:0,
            timeLong: 2000,
            myTimer:null
        }

        let obj1 = obj || {};
        for(let key in defaultObj){
            this[key] = obj1[key]!=undefined?obj1[key]:defaultObj[key];
        }
        this.createUI();
        this.addEvent();
        this.autoPlay();
    }

    createUI() {
        // 1、创建图片标签
        this.createImgs();
        // 2、创建分页器
        // this.createDous();
        // 3、左右箭头
        this.createArrows();
    }

    createImgs() {
        // 1、创建图片容器
        this.imgBox = document.createElement("div");
        this.imgBox.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        `;
        this.boxDom.appendChild(this.imgBox);            

        // 2、创建图片
        this.imgs.forEach((item,index) => {
            let imgDom = document.createElement("img");
            imgDom.src = item;
            imgDom.style.cssText=`
                    position: absolute;
                    left: ${index==0?0:this.width}px;
                    top: 0;
                    width: 100%;
                    height: 100%;
            `;
            this.imgDoms.push(imgDom);//把所有的img对象，放在一个数组里
            this.imgBox.appendChild(imgDom); //把img标签放在div里。
        });
    }

    // createDous() {
    //     // 1、创建分页器的容器
    //     this.douBox = document.createElement("ul");
    //     this.douBox.style.cssText = `
    //         list-style: none;
    //         position: absolute;
    //         left: 50%;
    //         transform: translateX(-50%);
    //         bottom: 20px;
    //         width: ${(this.imgs.length*2+1)*this.douWidth}px;
    //         height: ${this.douHeight*2}px;
    //         background-color: red;
    //         border-radius: ${this.douHeight}px;
    //         z-index: 999;
    //     `;
    //     this.boxDom.appendChild(this.douBox);

    //     // 2、创建每个按钮（豆豆）
    //     this.imgs.forEach((item,index)=>{
    //         let liDom = document.createElement("li");
    //         liDom.style.cssText = `
    //             float: left;                    
    //             margin-top: ${this.douHeight/2}px;
    //             margin-left:${this.douWidth}px;
    //             width: ${this.douWidth}px;
    //             height:${this.douHeight}px;
    //             background-color: ${index==0?this.highColor:this.color};
    //             border-radius: ${this.isCircle?50:0}%; 
    //         `;
    //         this.douDoms.push(liDom);
    //         this.douBox.appendChild(liDom);
    //     })
    // } 

    createArrows() {
        // 左箭头
        this.leftArrow = document.createElement("span");
        this.leftArrow.innerHTML = "《";
        this.leftArrow.style.cssText = `
                position: absolute;
                top: ${(this.boxDom.offsetHeight-40)/2}px;
                display: block;
                width: 60px;
                height: 40px;
                font-size: 30px;
                color: white;
                left: 0px;
                `;
        this.boxDom.appendChild(this.leftArrow);
        // 右箭头
        this.rightArrow = document.createElement("span");
        this.rightArrow.innerHTML = "》";
        this.rightArrow.style.cssText = `
                position: absolute;
                top: ${(this.boxDom.offsetHeight-40)/2}px;
                display: block;
                width: 60px;
                height: 40px;
                font-size: 30px;
                color: white;
                right: 0px;
        `;
        this.boxDom.appendChild(this.rightArrow);
    }

    // 自动播放
   // 1、自动播放
    autoPlay(){    
        this.myTimer = setInterval(()=>{        
            this.goImg(this.ord+1);       
        },this.timeLong)
    }

    // 2、点击豆豆切换对应的图片
    goImg(transOrd){ //ord+1 = 2
        if(transOrd==this.ord){
            return;
        }
        // 一、数据处理
        // 1、数据计算
        let outOrd = this.ord; //1
        this.ord = transOrd; //2

        // 2、边界处理
        if(this.ord<0){
            this.ord = this.imgs.length-1;
        }    
        if(this.ord>this.imgs.length-1){
            this.ord = 0;
        }   
        // 二、外观呈现
        // 1、图片滑入滑出
        //  让即将进入的图片的left为400；
        this.imgDoms[this.ord].style.left = this.width+"px";
        sliderH(this.imgDoms[outOrd],this.imgDoms[this.ord],-this.width,"left",this.timeLong/4);

        // 2、豆豆的变化
        // this.douDoms[outOrd].style.backgroundColor = this.color;
        // this.douDoms[this.ord].style.backgroundColor = this.highColor;    
    }

    // 3、鼠标移入停止
    stopPlay(){
        window.clearInterval(this.myTimer);
    }

    // 4、鼠标离开继续播放
    continuePlay(){
        this.autoPlay();
    }

    // 5、点击右箭头，跳转到下一张
    nextImg(){
        this.goImg(this.ord+1);    
    }

    // 6、点击左箭头，跳转到上一张
    previousImg(){
        this.goImg(this.ord-1);
    }

    addEvent(){
        // 点击豆豆跳转图片
        for(let i=0;i<this.douDoms.length;i++){
            this.douDoms[i].onclick = ()=>{
                this.stopPlay();
                this.goImg(i);
            }
        }
        // 3、鼠标进入停止播放
        this.boxDom.onmouseover = ()=>{
            this.stopPlay();
        }
        // 4、鼠标离开继续播放
        this.boxDom.onmouseout = ()=>{
            this.continuePlay();
        }

        // 5、点击右箭头
        this.rightArrow.onclick = ()=>{
            this.nextImg();            
        }

        // 6、点击左箭头
        this.leftArrow.onclick = ()=>{
            this.previousImg();
        }

        // 处理失去焦点和获取焦点
        window.addEventListener("blur",()=>{
            console.log("停止");
            console.log(this);
            this.stopPlay();
        });
        window.addEventListener("focus",()=>{
            console.log("继续");
            console.log(this);
            this.continuePlay();
        });
    }
}