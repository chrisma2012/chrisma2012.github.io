---
title: canvas一二
date: 2017-03-27 09:02:19
tags: javascript
---

最近在写一个刮刮乐的抽奖功能,总结起来主要的点有三个：
### 1. canvas的宽高设置 
这个是一个很奇怪的点，canvas的宽高必须是作为标签的属性存在,才会对之后js获取其宽高计算坐标点有效，否则按直接在样式里面写的宽高计算出来的坐标是不正确的。 
关于这个问题，后来在MDN的<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas>上找到了解释。
 
 
#### *Attributes*

This element's attributes include the global attributes. 
##### *height*
The height of the coordinate space in CSS pixels. Defaults to 150.
##### *moz-opaque*
Lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized.
##### *width*
The width of the coordinate space in CSS pixels. Defaults to 300.  
#### *Usage notes*
##### *Alternative content*
You may (and should) provide alternate content inside the canvas block. That content will be rendered both on older browsers that don not support canvas and in browsers with JavaScript disabled.

##### *Required canvas close tag*

Unlike the img element, the canvas element requires the closing tag.

##### *Sizing the canvas* 

The displayed size of the canvas can be changed using a stylesheet. The image is scaled during rendering to fit the styled size. If your renderings seem distorted, try specifying your width and height attributes explicitly in the canvas attributes, and not using CSS.    

在最后sizing the cancas说到，canvas在渲染的时候会进行缩放以适应样式内写好的宽高。所以如果出现渲染扭曲本意的时候，应该在canvas标签内，以属性的形式直接指定宽高。  

### 2. [globalCompositeOperation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)
Canvas 2D接口。使用语法：ctx.globalCompositeOperation = type (type为string类型)。其作用是，在绘制新图形的时候规定采用种混合操作。其值有：  

1、 source-over: 新图形覆盖在旧的图形上方
2、 source-in:   新图形只有和旧图形重叠的部分才会绘制
3、 source-out:  新图形只有和旧图形不重叠的部分才会绘制
4、 source-atop: 新图形只有和旧图形重叠的部分才会绘制，并且新图形的透明度会跟随旧图形  
5、 destination-over: 新图形绘制在旧图形的下方  
6、 destination-in:   只有和新图形重叠的部分才会显示，并且透明度跟随旧图形  
7、 destination-out:  只有新图形和旧图形不重叠的部分才会显示  
8、 destination-atop: 旧图形只有和新图形重叠的部分才会显示，并且新图形在旧图形下方  
9、 lighter:  
10、copy: 只显示新图形
11、xor: 
12、multiply:
13、screen:
14、overlay:
15、darken:
16、lighten:
17、color-dodge:
18、hard-light:
19、soft-light:
20、difference:
21、exclusion:
22、hue:
23、saturation:
24、color:
25、luminosity：  

### 3、屏幕触摸点的坐标获取    
```html
    <div id="container" style="position: relative;width: 700px;height: 300px">
        <div style="line-height:300px;font-size: 100px;">恭喜您中奖了</div>
        <canvas id="canvas" width="700" height="300"   style="margin: auto;text-align: center;line-height: 300px;position: absolute;z-index: 2;top:0;left: 0;opacity: 1">cesasdfasdfsdafasdfasd </canvas>
    </div>
    <script type="text/javascript">  
```  
```javascript
    var can = document.getElementById("canvas");
    var offsetX = can.offsetLeft,
        offsetY = can.offsetTop;
    var ctx = can.getContext("2d");
    ctx.fillStyle = "#51555C";
    ctx.beginPath();
    ctx.fillRect(0, 0, 700, 300);
    ctx.stroke();
    ctx.closePath();
    $(can).on("touchmove", function(e) {
        e.preventDefault();
        var movePos = e.originalEvent.touches[0];
        var x = (movePos.clientX + document.body.scrollLeft || movePos.pageX) - offsetX || 0,
            y = (movePos.clientY + document.body.scrollTop || movePos.pageY) - offsetY || 0;
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2 * Math.PI);
       // console.log("x轴：" + x, "y轴" + y);
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fill();
        ctx.closePath();
    });
```  
```html
    </script>  
```  
