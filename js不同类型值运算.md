## 一、valueOf()和 toString()的区别

## 二、基本数据类型隐私转换  
| 原始数据类型 | 转Number | 
|---        | ------|
| undefined| NaN| 
| null | 0 |
| false | 0 |
| true | 1 | 
| 数字串| 相应的数字| 
| 不能转化的字符串| NaN| 
  

|原始数据类型 | 转String | 
|---|---|
|undefined| undefined|
|null | null| 
| false | false| 
|true | true| 
|数字| 数字字符串|  


### 隐式转换逻辑  
如：“32”+32=“3232”    "+"可以把数字转换为字符串    “+”可以理解为字符串拼接

　　“32”-32=0            “- * /”可以把操作数转换为数字   “-”可以理解为减法运算

把一个变量num变成数字：num-0;

把一个变量num变成字符串：num+' ';  

### 不同类型的基础数据之间的加法，数据先转换为number，然后转换为string(如果有string类型数据参与运算)  
```javascript  
null + undefined // 0+NaN 

null + false // 0+0 

1 + true // 1+1

1 + '1' //'11';数字与字符串相加结果是字符串 

1 + 2 + '3'  //'33';(1+2)的结果然后与'3'相加;这里要把每一步加法单独拆开来看,否则变成和下面一样的结果了. 

1 + (2 +'3') //'123';先运算2+'3',然后1+'23' 

's' + null //'snull' 

's' + undefined // 'sundefined' 

's' + true //'strue' 

1 + true + undefined + 's' // 1+1+NaN+'s'=2+NaN+'s'=NaN+'s'=‘NaNs’  
```  

### 数据前有加号‘+'，可以让字符串转化为数字  
```javascript  
+'1'+1 // 2

+'s'+2 // NaN  
``` 

## 三、由于隐式转换只能转换原始值类型，如果转换对象等复杂类型需要用到valueOf()和toString()
  
    toString:  将一个对象转换为对应的字符串形式，该方法返回一个表示该对象的字符串

    valueOf: 
    返回当前对象的原始值。返回当前对象所对应的基本数据类型值
    如果当前对象无法获取到对应的基本数据类型，那么会将对象本身原封不动的返回

JS中的类型分为两大类： primitive(基本数据类型) 和 object(复杂数据类型)。
其中primitive类型的数据有6种，分别为: Null, Undefined, Number, String, Boolean, Symbol, BigInt。
不是primitive类型的值，都可以被认为是object类型
当object类型和primitive类型进行运算的时候，JS会尝试将object类型的数据转换为primitive类型的数据后再进行相应的运算
在ECMAScript文档，为object定义了一个内部方法toPrimitive，当JS需要将尝试将对象数据类型转换为基本数据类型的时候，就会调用这个方法
在ES6中，为引用数据类型提供了Symbol.toPrimitive属性，我们可以通过该属性来重写object的内部方法toPrimitive

在ECMAScript文档，为object定义了一个内部方法toPrimitive, 其会在进行类型转换或者运算的时候被调用。
```javascript  

// toPrimitive的伪代码形式如下:
toPrimitive(target, PreferredType = 'default': 'string' | 'number')
```  

* 如果没有定义PreferredType, 则默认为default;

* 如果PreferredType 的值为default，执行流程和PreferredType的值为number时的执行流程一致;

* 如果PreferredType的值为number,优先执行valueOf方法;  

        如果valueOf方法返回值是基本类型值，那么就直接返回基本类型值，不再继续调用toString方法;
        如果valueOf方法不存在或者返回的不是基本类型值，继续调用toString方法;

        如果调用了toString方法，并且返回了基本数据类型值，就直接返回数据类型值
        如果没有返回基本数据类型值，就抛出异常

* PreferredType的值为string,优先执行toString方法，

        如果toString方法返回值是基本类型值，那么就直接返回基本类型值，不再继续调用valueOf方法
        如果toString方法不存在或者返回的不是基本类型值，继续调用valueOf方法


        如果调用了valueOf方法,,并且返回了基本数据类型值，就直接返回数据类型值
        如果没有返回基本数据类型值，就抛出异常

（1）对象到字符串的转换过程

原始（基本）类型：undefined、null、string、number、boolean  
首先调用toString()方法，只有当toString不返回一个原始值的时候，才会调用valueOf()
toString()方法基本上所有对象都返回字符串。
toString()方法用在对象上面，比如function、array、object，返回的值都差不多，都是返回这个对象的源码，但是以字符串的形式表示。  

（2）对象到数字的转换过程  

首先调用valueOf()，如果返回原始值，将原始值转为数字并返回，valueOf()基本上所有的对象返回的都是对象，虽然先使用valueOf()，但实际上也是使用的toString()的方法。

    如将let a={ }; 转为数字

    首先会调用a的valueOf()方法，如果结果不是原始类型，那么调用toString()方法；

    a.valueOf()返回对象本身{ }，不是原始类型，所以需要继续调用toString()方法；

    a.toString()返回“[object,object]”，是一个字符串类型，即原始类型，所以接下来会调用Number(“[object,object]”)，返回NaN;


```javascript  
![] //false;
 +[]  // 0
 +![]  // 0
[]+[] // ""
{}+{}//"[object Object][object Object]"
{}+[]//0
{a:0}+1 // 1
[]+{}//"[object Object]"
[]+![]//"false"
{}+[]//0
![]+[] // "false"
''+{} //"[object Object]"
{}+'' //0
[]["map"]+[] //"function map() { }"
[]["a"]+[] // "undefined"
[][[]] + []// "undefined"
+!![]+[] //"1"
+!![] //1
1-{} //NaN
1-[] //1
true-1 //0
{}-1 //-1
[]==![] //true
```  


### 参考文章  
1、[探究JavaScript中的valueOf和toString](https://juejin.cn/post/7027098345999400968)  
2、[JS不同类型之间运算与转换](https://www.cnblogs.com/xiaoan0705/p/8671305.html)