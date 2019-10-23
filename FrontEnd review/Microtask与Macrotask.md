## 事件循环机制
### Macrotasks  
```javascript  
setTimeout、setInterval、setImmediate、I/O、UI rendering  
```  
### Microtasks  
```javascript  
process、nextTick、Promise、MutationObserver  
```  
js任务队列分为macrotasks和microtasks，在每次只会入栈一个macrotask，主线程执行完后再检查microtasks队列，并将队列里的任务全部执行完后，再继续下一个循环。