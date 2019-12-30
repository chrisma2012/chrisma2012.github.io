 ## 1、[ path.basename (path[, ext]) ](http://nodejs.cn/api/path.html#path_path_basename_path_ext)  

 ### 功能：返回 path 的最后一部分
```  
 参数  
     path <string>
     ext  <string> 可选的文件扩展名。  
```  
```javascript  
const curPath2 = path.basename('/api/path.html#path_path_basename_path_ext','.html')  
// path.html#path_path_basename_path_ext
```  

## 2、[ path.dirname(path) ](http://nodejs.cn/api/path.html#path_path_dirname_path)  

 ### 功能：返回 path 的目录名
```  
 参数  
     path <string>
```  
```javascript  
const curPath2 = path.dirname('/api/path.html#path_path_dirname_path' )
// /api
```  

## 3、[ path.extname(path) ](http://nodejs.cn/api/path.html#path_path_extname_path)  

 ### 功能：返回 path 的扩展名，从最后一次出现 .（句点）字符到 path 最后一部分的字符串结束。 如果在 path 的最后一部分中没有 . ，或者如果 path 的基本名称（参阅 path.basename()）除了第一个字符以外没有 .，则返回空字符串。
```  
 参数  
     path <string>
```  
```javascript  
path.extname('.index' )
//path 的基本名称除了第一个字符以外没有 .，则返回空字符串。
// ''

path.extname('index.coffee.md')
// .md

path.extname('index.');
// 返回: '.'

path.extname('index');
//在 path 的最后一部分中没有 . 
// 返回: ''
```  

## 4、[ path.join([...paths]) ](http://nodejs.cn/api/path.html#path_path_join_paths)  

 ### 功能：使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
```  
 参数  
     ...paths <string> 路径片段的序列
```  
```javascript  
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'
```  

## 5、[ path.relative(from, to) ](http://nodejs.cn/api/path.html#path_path_relative_from_to)  

 ### 功能：根据当前工作目录返回 from 到 to 的相对路径。
```  
 参数  
     ...paths <string> 路径片段的序列
```  
```javascript  
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
 // 返回: '../../impl/bbb'
```  

## 6、[ path.resolve([...paths]) ](http://nodejs.cn/api/path.html#path_path_relative_from_to)  

 ### 功能：将路径或路径片段的序列解析为绝对路径。
```  
 参数  
     ...paths <string> 路径或路径片段的序列。
```  
```javascript  
path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
 // 返回: '../../impl/bbb'
```  

## 7、 __dirname  
### 功能：（全局变量) 当前执行文件的路径 
```javascript  
例如在路径`C:\Users\123\Desktop\nodejs` 下存在index.js文件。当node执行该文件时，相应的__dirname值为`C:\Users\123\Desktop\nodejs`
 // 返回: '../../impl/bbb'
```  