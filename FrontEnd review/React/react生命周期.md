### React生命周期钩子  
```javascript  

//------------reconcile------------
getMaskedContext()               //旧的context机制，如果contextTypes存在时，内部会调用它到得context
resolveDefaultProps()
Constructor()
static getDerivedStateFromProps() //用于代替componentWillMount/Update/ReceiveProps
componentWillMount()              //componentWillMount与componentWillUpdate作用相同
componentWillUpdate()
getChildContext()                 //旧的context机制，生成新的子context
render()                          //产生子组件


//------------重新reconcile----------------
componentWillReceiveProps()       // 另一个setState的时机， 废弃
shouldComponentUpdate()           // 控制是否继续渲染子组件
//再次 componentWillUpdate 与 render ...


//------------commit------------
getSnapshotBeforeUpdate()        //新钩子
ref()                            //ref处理
componentDidMount()        
componentDidUpdate()


//------------出错处理------------
static getDerivedStateFromError() //它是在reconcile阶段处理，能早早切入备用的界面
componentDidCatch()               //它是在commit阶段处理，这时可能已经更新了一部分节点，
                                  //然后爆发异常，只好退到某一个父节点下，
                                  //将其所有子节点又全部干掉再渲染出错消息或补救用的界面


//------------dispose------------
componentWillUnmount()   
```  
