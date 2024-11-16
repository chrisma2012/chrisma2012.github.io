---
title: webpack配置说明
date: 2017-10-21 11:07:38
tags:
---
之前使用webpack的时候总是不太明白webpack.config.js里面的参数是如何配置的，每个参数又有什么作用，所以也一直不敢随便更改  
里面的配置,直接导致了对项目的不熟悉。因此趁现在有时间，遂对配置的字段的一一学习。
<!-- more -->
```javascript  
const path = require('path'); //获取node环境下的路径

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'), //打包后的文件输出的路径
		filename: 'main.js'   //
	},
	module:{
		rules: [
            {
            	test: /\.vue$/,
            	loader: 'vue-loader'
            },     
            {
            	test: /\.js$/,
            	loader: 'babel-loader',
            	exclude: /node_modules/
            },
            {
            	test: /\.css$/,
            	loader: 'style-loader!css-loader'
            },
            {
            	test: /\.scss$/,
            	loader: 'style-loader!css-loader!sass-loader!'
            },
            {
            	test: /\.(png|jpg|gif|svg)$/,
            	loader: 'file-loader'
            }
		]
	},
	plugins: [
         new webpack.optimize.UglifyJsPlugin(),
         new HtmlWebpackPlugin()	
	]

}

```  
[TOC]

### Entry 

entry有三种配置方法，分别是字符串、数组和对象。写法又有两种，有无main属性，无main属性的为简洁写法。  

#### 1、无main属性   
**字符串写法**
```javascript  
 const config = {
      entry: 'main.js'
};

module.exports = config; 

```  
**数组写法 **
```javascript  
const config = {
      entry: ['main1.js','main2.js']
}  
```  
**对象写法  **
```javascript  
const config = {
      entry: {
            app: 'main.js',
            vendors: 'main2.js'
      }
}
```  

#### 2、有main属性  
**字符串写法 **
```javascript  
const config = {
      entry: {
            main: 'main.js'
      }
} 
```  
**数组写法**  
```javascript  
const config = {
      entry: {
            main:[
              'main1.js',
              'main2.js'
            ]
      }
}  
```  
