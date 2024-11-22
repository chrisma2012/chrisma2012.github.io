## 命名空间（namespace）  
```javascript  
namespace Utils {
  function isString(value: any) {
    return typeof value === "string";
  }
  // 正确
  isString("yes");
}

Utils.isString("no"); // 报错
```  
命名空间的作用在于为想要的工具提供一个上下文的包裹，不至于说与全局的数据发生冲突污染。  
上述代码中，在命名空间外调用`Utils.isString("no")`报错，是因为`isString`没有export。  
```javascript  
namespace Utils {
 export function isString(value: any) {
    return typeof value === "string";
  }
  // 正确
  isString("yes");
}
Utils.isString("no"); //不报错
```  
加上export后，就可以在命名空间外部使用内部成员     


## 模块（module）【TODO待补充esm模块的说明】  

CommonJS 是 Node.js 的专用模块格式，与 ES 模块格式不兼容。

#### import = 语句
TypeScript 使用import =语句输入 CommonJS 模块。
```typescript
import fs = require("fs");
const code = fs.readFileSync("hello.ts", "utf8");
```
上面示例中，使用import =语句和require()命令输入了一个 CommonJS 模块。模块本身的用法跟 Node.js 是一样的。  
除了使用import =语句，TypeScript 还允许使用import * as [接口名] from "模块文件"输入 CommonJS 模块。
```typescript
import * as fs from "fs";
// 等同于
import fs = require("fs");
``` 
#### export = 语句
TypeScript 使用export =语句，输出 CommonJS 模块的对象，等同于 CommonJS 的module.exports对象。

```typescript
let obj = { foo: 123 };

export = obj;
export = 语句输出的对象，只能使用import =语句加载。
```
```typescript
import obj = require("./a");

console.log(obj.foo); // 123
```
#### 举个例子：   
```typescript  
declare namespace Electron {
    interface A {}
}
declare module 'electron' {
  export = Electron.A;
}
declare module 'electron/common' {
  export = Electron.B;
}
```
使用的时候则是：
```typescript  
import A from 'electron' 
//或者
import B from 'electron/common' 
```



## 如何区分导入类型和正常变量 
import 在一条语句中，可以同时输入类型和正常接口。

```typescript
// a.ts
export interface A {
  foo: string;
}
export let a = 123;
// b.ts
import { A, a } from "./a";
```  

上面示例中，文件a.ts的 export 语句输出了一个类型A和一个正常接口a，另一个文件b.ts则在同一条语句中输入了类型和正常接口。
这样很不利于区分类型和正常接口，容易造成混淆。为了解决这个问题，TypeScript 引入了两个解决方法。
第一个方法是在 import 语句输入的类型前面加上type关键字。

```typescript
import { type A, a } from "./a";
```
上面示例中，import 语句输入的类型A前面有type关键字，表示这是一个类型。
第二个方法是使用 import type 语句，这个语句只能输入类型，不能输入正常接口。

```typescript
// 正确
import type { A } from "./a";
// 报错
import type { a } from "./a";
```
上面示例中，import type 输入类型A是正确的，但是输入正常接口a就会报错。 

###  *.d.ts文件声明全局变量  
在 TypeScript 中，.d.ts 文件被用于声明全局变量、函数、类等的类型信息，以补充缺失或不确定的类型定义。这些声明文件不需要被导出，而是被自动地包含在项目的类型检查过程中。
假设我们声明了一个B.d.ts文件，然后在A.ts文件内使用B.d.ts的类型声明，原则上不需要再手动引入，编辑器会全局检索。但是如果无法自动获取到类型的话，可在tsconfig.json里配置 
```javascript  
{
  "compilerOptions": {
   //
  },
  "files": ["type.d.ts"], //配置编译的文件
  "include": [
    "src"
  ]
}
```
**【题外话】**
另外如果我们是通过vscode的提示直接通过`import aType from 'B' `的方式来使用的时候，程序会报找不到 B文件的错误！   
解决方法是改为 `import type { aType } from 'B'` 引入就可以了。指定是加载ts类型，而不是普通变量。这里的原因可能是tsconfig.json配置不对，导致没有自动读取而需要手动引入*.d.ts文件。

## typeof 和 keyof  
#### 首先是typeof  
```typescript  
interface IPerson {
  name: string;
  age: number;  
}
let person: IPerson = {
  name: 'xman',
  age: 18  
};
 typeof person 
 // 结果就是 
//  interface IPerson {
//   name: string;
//   age: number;  
// }
```
另外一个例子：
```typescript   
function add (x: number, y: number): number {
  return x + y;  
}
type Add = typeof add;  
//结果  
//type Add = (x: number, y: number) => number
```  

#### 其次是keyof  
```typescript  
interface IPerson {
  name: string;
  age: number;  
}
keyof IPerson 
// 结果为 {
//   name: string;
//   age: number;  
// }
```  
#### 经典应用场景  
```typescript  
for(let key in target){
    newTarget[key as keyof typeof newTarget]= target[key as keyof typeof target]
}
```