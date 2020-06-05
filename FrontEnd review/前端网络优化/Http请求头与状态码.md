### 请求头  
1、GET :   请求服务器发送某个资源  
2、HEAD:   响应只返回首部，不会返回实体的主题部分。允许客户端在未获取实际资源的情况下，对资源的首部进行检查  
3、PUT :   向服务器写入文档  
4、POST：  向服务器发送表单数据  
5、TRACE： 允许客户端查看请求经过哪些代理、网关  
6、OPTIONS：请求web服务器告知其支持的各种功能  
7、DELETE: 请求服务器删除URL所指定的资源

### 状态码

100-199 信息性状态码
```javascript  
100  Continue
101  Switching Protocols
```  
  
200-299  成功状态码  
```javascript  
200  OK  
201  Created 
202  Accepted  
203  Non-Authoritative Information 
204  No Content 
205  Reset Content 
206  Partial Content 
```  
300-399  重定向状态码  
```javascript   
300  Multiple Choices  
301  Moved Permanently  
302  Found  
303  See Other  
304  Not Modified  
305  Use Proxy  
306  (当前未使用)
307  Temporary Redirect 
```  
400-499  客户端错误状态码  
```javascript  
400  Bad Request 
401  Unauthorized 
402  Payment Required 
403  Forbidden  
404  Not Found 
405  Method Not Allowd 
406  Not Acceptable  
407  Proxy Authentication Required 
408  Request Timeout  
409  Conflict  
410  Gone 
411  Length Required 
412  Precondition Failed 
413  Request Entity Too Large 
414  Request URI Too Long 
415  Unsupported Media Type 
416  Requested Range Not Satisfiable 
417  Expectation Failed
```  
500-599  服务器错误状态码  
```javascript  
500  Internal Server Error 
501  Not Implemented 
502  Bad Gateway  
503  Service Unavailable
504  Gateway Timeout 
505  HTTP Version Not Supported
```
