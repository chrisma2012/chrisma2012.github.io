html结构：
```html  
    <div class="container" id='container'>
        <div class="wave-container" id="wave-container">
            <div class="wave-body">
                <div class="wave wave5"></div>
                <div class="wave wave4"></div>
                <div class="wave wave3"></div>
                <div class="wave wave2"></div>
                <div class="wave wave1"></div>
                <div class="wave wave0"></div>
            </div>
        </div>
    </div>
```  

#### 写水波纹最需要注意的地方是：  
.container容器设置图片背景，.wave-conatiner为波纹容器，并且.container和.wave样式都必须要设置 
```css  
    background-attachment: fixed;
    background-position: center center;
    background-size: auto 100%;
``` 
不然会出现背景图片和波纹图片匹配不齐的问题。  

其次是水波纹同心圆随着animation的变化，圆心位置的固定问题：
```css  
    top: calc((100% - 0px)/2);
    left: calc((100% - 0px)/2);
    width: 0px;
    height: 0px;  
```  
最后是波纹的视觉荡漾效果：
```css  
    .wave0 {
        z-index: 2;
        background-size: auto 106%;
        animation: w 1s forwards;
    }

    .wave1 {
        z-index: 3;
        background-size: auto 102%;
        animation: w 1s .2s forwards;
    }

    .wave2 {
        z-index: 4;
        background-size: auto 104%;
        animation: w 1s .4s forwards;
    }

    .wave3 {
        z-index: 5;
        background-size: auto 101%;
        animation: w 1s .5s forwards;
    }

    .wave4 {
        z-index: 6;
        background-size: auto 102%;
        animation: w 1s .8s forwards;
    }

    .wave5 {
        z-index: 7;
        background-size: auto 100%;
        animation: w 1s 1s forwards;
    }  
```  
附：css样式：  
```css  
    .container {
        position: absolute;
        background: url('./1.png') no-repeat;
        width: 868px;
        height: 487px;
        background-size: contain;
        background-attachment: fixed;
        background-position: center center;
        background-size: auto 100%;
    }

    .wave-container {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 190px;
        right: 90px;
    }

    .wave-body {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .wave {
        position: absolute;
        background: url('./1.png');
        border-radius: 300px;
        top: calc((100% - 0px)/2);
        left: calc((100% - 0px)/2);
        width: 0px;
        height: 0px;
        background-attachment: fixed;
        background-position: center center;
        background-size: auto 100%;

    }

    .wave0 {
        z-index: 2;
        background-size: auto 106%;
        animation: w 1s forwards;
    }

    .wave1 {
        z-index: 3;
        background-size: auto 102%;
        animation: w 1s .2s forwards;
    }

    .wave2 {
        z-index: 4;
        background-size: auto 104%;
        animation: w 1s .4s forwards;
    }

    .wave3 {
        z-index: 5;
        background-size: auto 101%;
        animation: w 1s .5s forwards;
    }

    .wave4 {
        z-index: 6;
        background-size: auto 102%;
        animation: w 1s .8s forwards;
    }

    .wave5 {
        z-index: 7;
        background-size: auto 100%;
        animation: w 1s 1s forwards;
    }

    @-webkit-keyframes w {
        0% {
            top: calc((100% - 0px)/2);
            left: calc((100% - 0px)/2);
            width: 0px;
            height: 0px;
            opacity: 1;
        }

        100% {
            top: calc((100% - 300px)/2);
            left: calc((100% - 300px)/2);
            width: 300px;
            height: 300px;
            opacity: 0;

        }
    }
```  