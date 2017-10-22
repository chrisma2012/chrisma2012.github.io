---
title: sublime插件配置
date: 2017-10-21 11:07:02
tags:
---
## sublime插件
### 1、SideBarEnhancements配置  
在key Bindings-user打开的文件粘贴下面配置： 
```javascript  
    [ {
        "keys": ["f1"],
        "command": "side_bar_files_open_with",
        "args":
        {
            "application": "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
            "extensions": ".*",
            "paths": []
        }
    }]  
```  
<!-- more -->
如果需要配置多个浏览器，则将数组内的对象复制多个，修改对应浏览器的路径即可。  

### 2、LiveReload配置  
首先在chrome浏览器上安装livereload插件，并且启用允许访问文件网址，在浏览器右侧点击该插件的图标，以启用该插件  
然后在sublime安装同名的该插件，在settings-User 内粘贴下面配置：
```javascript  
{
    "enabled_plugins": [
        "SimpleReloadPlugin",
        "SimpleRefresh"
    ]
}  
```  
然后在每次重新打开sublime的时候都必须在liveReload - Plugins - enable/disable 启用该插件  
至此每次保存文件的时候浏览器都会自动刷新页面了。  
**缺点：  在编辑器保存任意一个文件的时候，浏览器都会刷新所有编辑器在浏览器中打开的文件。**  

### 3、OmniMarkupPreviewer配置  
浏览器实时编写预览MD文件  
安装好插件后，在key Bindings - User 配置快捷键  

    //OmniMarkupPreviewer配置  
    {
        "keys": ["f4"], //浏览器预览MD文件
        "command": "omni_markup_preview",
        "context": [
        {
            "key": "omnimarkup_is_enabled",
            "operator": "equal",
            "operand": ""
        }]
    },
    {
        "keys": ["f5"],  //将MD导出为HTML
        "command": "omni_markup_export",
        "context": [
        {
            "key": "omnimarkup_is_enabled",
            "operator": "equal",
            "operand": ""
        }]
    },
    {
        "keys": ["ctrl+alt+c"],
        "command": "omni_markup_export",
        "args":
        {
            "clipboard_only": true
        },
        "context": [
        {
            "key": "omnimarkup_is_enabled",
            "operator": "equal",
            "operand": ""
        }]
    }