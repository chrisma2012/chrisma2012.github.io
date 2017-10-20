---
title: canvas一二
date: 2017-03-22 08:49:01
tags: javascript
---  
 

  最近在写一个刮刮乐的抽奖功能,总结起来主要的点有三个：
  ### 1. canvas的宽高设置 
      这个是一个很奇怪的点，canvas的宽高必须是作为<canvas>标签的属性存在,才会对
      之后js获取其宽高计算坐标点有效，否则按直接在样式里面写的宽高计算出来的坐
      标是不正确的。 
      关于这个问题，后来在MDN的<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas>上找到了解释。  
      ```javascript  
      >
      Attributes
      This element's attributes include the global attributes.
      height
      The height of the coordinate space in CSS pixels. Defaults to 150.
      moz-opaque 
      Lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized.
      width
      The width of the coordinate space in CSS pixels. Defaults to 300.  
      ### Usage notes 
      Alternative content

        You may (and should) provide alternate content inside the <canvas> block. That content will be rendered both on older browsers that don't support canvas and in browsers with JavaScript disabled.

        Required </canvas> tag

        Unlike the <img> element, the <canvas> element requires the closing tag (</canvas>).

        Sizing the canvas

        The displayed size of the canvas can be changed using a stylesheet. The image is scaled during rendering to fit the styled size. If your renderings seem distorted, try specifying your width and height attributes explicitly in the <canvas> attributes, and not using CSS.
