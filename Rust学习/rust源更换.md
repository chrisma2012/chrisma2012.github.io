在路径 C:\Users\123\.cargo 新建config文件，内容如下：
```  
[source.crates-io]
replace-with = 'ustc'

[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"  
```  
保存重启编辑器