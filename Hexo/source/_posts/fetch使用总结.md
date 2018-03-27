---
title: fetch使用总结
date: 2018-02-06 21:28:40
tags:
---

### fetch api  
**fetch(url,options)  **其中url 为请求路径，options为可选参数。可选值有：  
     
     {  
        method:       请求方法，  
        headers：     请求头信息，json或者Headers对象，其中包含请求头的各种信息Access-Control-Allow-Origin等,    
        body：        Blob、Buffersource、FormData、URLsearchParams说着USVString对象。并且GET或HEAD请求不能有body字段。    
        mode：        请求模式。值：cors、no-cors或者 same-origin  
        credentials： 是否自动发送cookie。值：omit、same-origin、include  
        cache：       请求的cache模式。值：default、no-store、reload、no-cache、force-cache、only-if-cached  
        redirect：    follow(自动重定向)、error(如果产生重定向将自动终止并且抛出一个错误)、manual(手动处理重定向)  
        referrer：    USVString类型的 no-referrer、client或者URL，默认client。  
        referrerPolicy： 指定referer HTTP头部的值。值：no-referrer、no-referrer-when-downgrade、origin、 
                         origin-when-cross-origin、unsafe-url 
        integrity:     包括请求的subresource integrity值
    }  

<!-- more -->
**1、**调用fetch()方法会得到一个包含了response(一个Response对象)的promise对象  
使用fetch()方法必须设置请求头参数的类型，即Content-Type: appliaction/json或application/x-www-form-urlencoded等,因为这涉及到后台能否正确的解析前台传过来的参数。同时还可以设置Accept字段，目的是告诉服务器前台接受什么样的参数类型。  

**2、**另外，因为GET、HEAD请求不能在fetch()的options参数设置body字段，所以可以通过将参数拼接成查询字符串的形式，附加在url后面，达到向服务器传递参数的目的。  

**3、**使用fetch进行cors请求时，浏览器会自动向服务器发起一个OPTIONS的预检请求，检测服务器是否能够提供跨域支持。鉴于此，服务器每次接收一个有意义的请求时都会伴随着一个无意义的OPTION预检，所以后台编程需要注意区分是否是OPTIONS预检请求。  

**4、**fetch在跨域设置浏览器cookie的时候有一个很怪异的地方，也或许是本人弄错了。fetch()方法有两个参数，第二个参数是个可选的配置对象，诡异的地方就出现在这里。如果第二个参数以对象变量的形式传入,那么是无法在浏览器上设置cookie的，即用document.cookie或者在Application下的cookie栏都是看不到cookie信息的。但是如果第二个参数直接以对象字面量的形式传入，则是有效的。对比代码如下：  

##### 无法设置cookie
```javascript  
  let optsData = Object.create(null);
  optsData.mode = 'cors';
  optsData.credentials = 'inlucde';
  optsData.cache = 'no-cache';
  ......

  const res = await fetch(opts.url,  optsData);  
  ```

##### 成功设置cookie  
```javascript  
const res = await fetch(opts.url, {
    mode: 'cors',
    credentials: 'include',
    method: optsData.method,
    headers: optsData.headers,
    body: optsData.body || {}
  });  
```
具体的原因暂时不清，翻墙Google了一整天都没有找到合适的答案，还请知道的大兄指点一二。。。。。  

### Body  
不管是请求或响应都能包含body对象，body对象的类型可以为：  

*ArrayBuffer  
*ArrayBufferView  
*Blob/File  
*string  
*URLSearchParams  
*FormData  

亦即是说，在上一节fetch api里options的参数body类型可以为以上的几种。