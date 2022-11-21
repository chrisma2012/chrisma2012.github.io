## typeof类型判断  


下表总结了 typeof 可能的返回值  

!['图片'](./typeof%E7%B1%BB%E5%9E%8B%E5%88%A4%E6%96%AD.png)  

### 一、number类型  
```javascript  
typeof Math.LN2 === 'number';

typeof Infinity === 'number';

typeof NaN === 'number';       // 尽管它是 "Not-A-Number" (非数值) 的缩写

typeof Number(1) === 'number';   // Number 会尝试把参数解析成数值
```  


### 二、string类型  
```javascript  
typeof  `template literal` === 'string';

typeof  '1' === 'string';             // 注意内容为数字的字符串仍是字符串

typeof  (typeof 1) === 'string';      // typeof 总是返回一个字符串

typeof String(1) === 'string';  // String 将任意值转换为字符串，比 toString 更安全  
```  
### 三、boolean类型  
```javascript  
typeof Boolean(1) === 'boolean';    // Boolean() 会基于参数是真值还是虚值进行转换

typeof !!(1) === 'boolean';       // 两次调用 !（逻辑非）运算符相当于 Boolean()
```  

### 四、Symbol类型  
```javascript   
typeof Symbol() === 'symbol';

typeof Symbol('foo') === 'symbol';

typeof Symbol.iterator === 'symbol';  
```

### 五、undefined类型  
```javascript  
 typeof undefined === 'undefined';
 ```  

 ### 六、object类型  
 ```javascript  
 // 使用 Array.isArray 或者 Object.prototype.toString.call  区分数组和普通对象

typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';

typeof /regex/ === 'object';



// 下面的例子令人迷惑，非常危险，没有用处。避免使用它们。 

//注意与上面布尔值类型的对比。typeof Number(1) === 'number'

typeof new Boolean(true) === 'object';

typeof new Number(1) === 'object'; 

typeof new String('abc') === 'object';  

```

### 七、函数类型  
```javascript  
typeof function() {} === 'function';

typeof class C {} === 'function'； //类也是函数类型

typeof Math.sin === 'function';

```  

### 八、null类型  
```javascript  
// JavaScript 诞生以来便如此
typeof null === 'object' 

```  


