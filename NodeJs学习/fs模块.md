 ## 1、[ fs.watch (filename[, options][, listener]) ](http://nodejs.cn/api/fs.html#fs_fs_watch_filename_options_listener)  

 ### 功能：监视 filename 的更改，其中 filename 是文件或目录。
```  
 参数  
    filename <string> | <Buffer> | <URL>
    options  <string> | <Object>
    listener <Function> | <undefined> 默认值: undefined。  
```  
 

## 2、[ fs.watchFile (filename[, options], listener) ](http://nodejs.cn/api/fs.html#fs_fs_watchfile_filename_options_listener)  

 ### 功能： 监视文件 filename 的更改。 每当访问文件时都会调用 listener 回调。  
 ```  
  参数  
     filename <string> | <Buffer> | <URL>  
     options  <Object>
     listener <Function>  
``` 

## 3、[ fs.copyFile(src, dest[, flags], callback) ](http://nodejs.cn/api/fs.html#fs_fs_copyfile_src_dest_flags_callback)  

 ### 功能： 异步地将 src 拷贝到 dest。 默认情况下，如果 dest 已经存在，则覆盖它。 除了可能的异常，回调函数没有其他参数  
 ```  
  参数  
    src      <string> | <Buffer> | <URL> 要拷贝的源文件名。
    dest     <string> | <Buffer> | <URL> 拷贝操作的目标文件名。
    flags    <number> 用于拷贝操作的修饰符。默认值: 0。
    callback <Function>
``` 