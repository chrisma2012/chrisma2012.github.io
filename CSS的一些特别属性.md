## CSS的一些特别属性  
* 1、[pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)  
当需要在目标元素上层放置其他元素（例如透明遮罩）,但是又要使得目标元素能获取到鼠标事件时，可以使用该属性：
```css  
pointer-events: none
``` 
该设置能够使得鼠标事件穿透遮罩元素传递给目标元素。  

* 2、[touch-action](https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action)  
指定某个给定的区域是否允许用户操作，以及如何响应用户操作（比如浏览器自带的划动、缩放等）
```css 
touch-action: none;
```  
当触控事件发生在元素上时，不进行任何操作