---
title: 各种protoype
date: 2018-03-20 12:34:50
tags:
---

1、对象字面量的原型  
```javascript  
var a = {};
var c = Object.getPrototypeOf(a);
var d = Object.prototype;

console.log(c === d);  // true  
```
通过对象字面量创建的对象，其原型[[Prototype]]实际上指向的是Object的prototype。由此可知，对象字面量创建对象的方法等效于通过new Object()方法。

2、函数的原型  
```javascript  
var f = function(){};
//或者 function f(){}

Object.getPrototypeOf(f)  === Function.prototype;  // true
Object.getPrototypeOf(f)  ===  f.__proto__ //true  
f.__proto__ === Function.prototype; //true;
Function.prototype._proto_ === Object.prototype;  // true   
f.prototype   // {constructor: ƒ}
```  
在js中，函数也属于对象，是Function构造函数的实例。因此函数的原型可以分两种：第一种是把函数当作对象时的原型，可以通过函数名的`__proto__`属性访问；第二种是把函数当作构造函数，这时直接通过prototype属性便可访问到该函数的原型。