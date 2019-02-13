# react-typescript
react-ts 脚手架

## ts 在react 上的写法差异

- import React from 'react'  --->   import * as React from 'react';    react-dom等也是如此
- import {A} from 'AA' 不变



## 样式的导入有差异

webpack 中 rule 需要使用 typings-for-css-modules-loader 来进行编译

最简单的配置,同样使用的是css-module 的方式 ， 不使用 css-loader 改为 typings-for-css-modules-loader

```
    {
        test: /\.css$/,
        include: [resolve('src')],
        use: [
            'style-loader',
            typingsForCssModulesLoader,
        ]
    },

```
导入方式改为 `import * as style './styles.css'`



# 定义接口的几种类型

### 函数类型
```
interface IFunction {
    (p1:string,p2:number): boolean;
}
```
function 参数 p1 p2  返回布尔值

### 数组类型
数组类型拥有一个 `index` 类型，是用来索引数组的
```
interface IArray {
    [index: number]: string;
}
```
匹配数组， 每一项为字符串的格式` ["a","b"] `

Index类型能够支持两种类型：string和number，所以我们能够实现字典类型

```
interface IMap {
    [index: string] :string|number;
}
```
可以匹配value是 字符串 或 数字 的字典值 
```
{
  a:'2',
  b:2
}
或者
{
  'a':2,
  'b':'2'
}
```

### 类类型

定义一个类的接口，就需要一个类去实现这个接口

```
interface IClass {
    date: Date
}

class D implements IClass{
     date: Date;
     setTime(d: Date) {
        this.date = d;
     }
}
```
### 混合类型

```
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

var c: Counter;
c(10);
c.reset();
c.interval = 5.0;

```

### 嵌套类型
比如我想要一个这种类型的

```
[
  {
    id: '123',
    sex: '123',
    age: 12,
    onChange: () => { }
  }, {
    id: '134',
    sex: '123',
    age: 122,
    onChange: () => { }
  }
]

```
可以这么定义

```
interface ObjectInArray {
  [index: number]: { id: string; sex: string; age: number; onChange(): void }
}
```
解释： `[`index:number]`--> 数组 里面是一个对象，个数不限

## 接口的继承

```
interface A {
  color:string;
}
interface D {
    sex:string
}
interface B extends A,D{
  name:number;
}

var c:B 
c.color = '123';
c.name = 123;
c.sex = 'man';

```


### 只读属性 readonly

```
interface Citizen {
    name: string;
    readonly SSN: number;
}

let personObj: Citizen  = { SSN: 110555444, name: 'James Bond' }

personObj.name = 'Steve Smith'; // OK
personObj.SSN = '333666888'; // Compiler Error
```

### 实现接口
TypeScript中的接口可以使用Class实现。实现接口的类需要严格遵循接口的结构。
```
interface IEmployee {
    empCode: number;
    name: string;
    getSalary:(number)=>number;
}

class Employee implements IEmployee { 
    empCode: number;
    name: string;

    constructor(code: number, name: string) { 
                this.empCode = code;
                this.name = name;
    }

    getSalary(empCode:number):number { 
        return 20000;
    }
}

let emp = new Employee(1, "Steve");
```
在上面的示例中，IEmployee使用`implement`关键字在Employee类中实现接口。实现类应严格定义具有相同名称和数据类型的属性和函数。如果实现类不遵循该结构，则编译器将显示错误。
当然，实现类可以定义额外的属性和方法，但至少它必须定义接口的所有成员。






type 关键字



# 泛型
