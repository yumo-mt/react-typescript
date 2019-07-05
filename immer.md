# Immer

![image](http://demo.manster.me/img/immer.png)

> Create the next immutable state tree by simply modifying the current tree

常用API就一个`produce`，掌握之后就可以应对绝大多数业务场景

## produce 

几个基本概念

- currentState 被操作对象的最初状态
- draftState 根据 currentState 生成的草稿状态，它是 currentState 的代理，对 draftState 所做的任何修改都将被记录并用于生成 nextState 。在此过程中，currentState 将不受影响
- nextState 根据 draftState 的修改生成的最终状态
- recipe 操作方法 用来操作 draftState 的函数
```
produce(currentState, recipe: (draftState) => void): nextState
```

### produce的第一种使用姿势
```
let currentState = {
  x:1,
  y:1
}
let nextState = produce(currentState, (draft) => {
  draft.x = 2;
})

console.log(currentState);  // {x:1,y:1}
console.log(nextState); // { x: 2, y: 1 }


```
```
let currentState = {
  a: [],
  p: {
    x: 1
  }
}

let nextState = produce(currentState, (draft) => {
  draft.a.push(2);
})

currentState.a === nextState.a; // false
currentState.p === nextState.p; // true

```
draftState 的修改都会反应到 nextState 上，而 Immer 使用的结构是共享的，nextState 在结构上又与 currentState 共享未修改的部分，类似于immutable gif的样子

### 自动冻结
Immer 还在内部做了一件很巧妙的事情，那就是通过 produce 生成的 nextState 是被冻结（freeze）的，（Immer 内部使用Object.freeze方法，只冻结 nextState 跟 currentState 相比修改的部分），这样，当直接修改 nextState 时，将会报错。 这使得 nextState 成为了真正的不可变数据。
```
let currentState = {
  a: [],
  p: {
    x: [1]
  }
}
let nextState = produce(currentState, (draft) => {
  draft.p.x.push(2);
})
// nextState.p.x.push(3);  报错
nextState.a.push(1)
nextState.c = 3; // 无效
console.log(nextState); // { a: [ 1 ], p: { x: [ 1, 2 ] } }

```

### produce的第二种使用姿势

`produce(recipe: (draftState) => void | draftState)(currentState): nextState`

传入的第一个参数是函数

高阶函数的写法，提前生成一个producer方法，当producer 方法被调用的时候，它会把第一个参数用作你希望改变的 currentState

```
let producer = produce((draft) => {
  draft.x = 2
});
let nextState = producer(currentState);
```
正因为有这个操作，所以我们可以很方便使用到setState 中，因为 setState 有接收函数作为参数的能力。

```
// 想要更新state 中的name = 'BBB';
let producer = produce((draft)=>{
  draft.name='BBB'
})
this.setState(producer)

```

### 注意recipe的返回值

- recipe 没有返回值时：nextState 是根据 recipe 函数内的 draftState 生成的；

- recipe 有返回值时：nextState 是根据 recipe 函数的返回值生成的；

但是不能同时修改了draftState 也 return 一个新的state，否则会报错，提示你只能修改draft 或者 return value；
```
let currentState = {
  name: 'aaa'
}

let nextState = produce(currentState,(draft)=>{
  draft.name = 'bbb';
 // return {v:'v'}
})

console.log(nextState);
```

## Patches 补丁

Patches 可以在recipe执行期间记录所有操作，方便去做一些数据回滚或者是数据跟踪调试啥的。

patch 对象长这个模样
```
interface Patch {
  op: "replace" | "remove" | "add" // 一次更改的动作类型
  path: (string | number)[] // 此属性指从树根到被更改树杈的路径
  value?: any // op为 replace、add 时，才有此属性，表示新的赋值
}
```

语法

```
produce(
  currentState, 
  recipe,
  // 通过 patchListener 函数，暴露正向和反向的补丁数组
  patchListener: (patches: Patch[], inversePatches: Patch[]) => void
)
```
###  新API `applyPatches`


Demo 1
```

let state1 = {
  x: 1,
  y: 1
}
console.log(state1);
let patches1 = [];
let inversePatches1 = [];

let state2 = produce(state1, (draft) => {
  draft.x = 2;
  draft.y = 2;
}, (patches, inversePatches) => {
  patches1 = patches;
  inversePatches1 = inversePatches;
});

console.log(state2);

let patches2 = [];
let inversePatches2 = [];

let state3 = produce(state2, (draft) => {
  draft.x = 3;
  draft.y = 3;
}, (patches, inversePatches) => {
  patches2 = patches;
  inversePatches2 = inversePatches;
});

console.log(state3);

let backState2 = applyPatches(state3,inversePatches2)

console.log(backState2);

let backState1 = applyPatches(state2,inversePatches1)

console.log(backState1);

```
不允许跨级回滚
```

let state1 = {
  list:[
    {
      name:'thor'
    },
    {
      name:'Rogers'
    },
  ]
}
console.log(state1);

let patches1 = [];
let inversePatches1 = [];

let state2 = produce(state1, (draft) => {
  draft.list.push({name:'Natasha'});
  draft.list.shift();
}, (patches, inversePatches) => {
  patches1 = patches;
  inversePatches1 = inversePatches;
});
console.log(state2);
let patches2 = [];
let inversePatches2 = [];
let state3 = produce(state2, (draft) => {
  delete draft.list;
  draft.world = [{name:'Marvel'}]
}, (patches, inversePatches) => {
  patches2 = patches;
  inversePatches2 = inversePatches;
});

console.log(state3);

let backState2 = applyPatches(state3,inversePatches2)

console.log(backState2);

let backState1 = applyPatches(state2,inversePatches1)

console.log(backState1);
```


## createDraft、finishDraft

```
let currentState = {
  x: 1
}
let draft = createDraft(currentState);
draft.x=2;
const nextState = finishDraft(draft);
console.log(currentState);
console.log(nextState);

```