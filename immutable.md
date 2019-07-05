
# mutable 易变的，可变的

因为js当中的数据类型、弱类型语言的写法，会导致有些数据在我们意想不到、忽视的地方发生改变，导致一些意想不到的bug，并且还不太好调试。
```
let a = [1,2];
let b = a;
b.push(3)
```

# Immutable 不可变的

> Shared mutable state is the root of all evil（共享的可变状态是万恶之源）

![image](http://img.alicdn.com/tps/i2/TB1zzi_KXXXXXctXFXXbrb8OVXX-613-575.gif)

### Immutable 优点
1. Immutable 降低了 Mutable 带来的复杂度
 可变（Mutable）数据耦合了 Time 和 Value 的概念，造成了数据很难被回溯。
```
function touchAndLog(touchFn) {
  let data = { key: 'value' };
  touchFn(data);
  console.log(data.key); // 猜猜会打印什么？
}
```
深克隆 太耗费性能

2. 节省内存
Immutable.js 使用了 Structure Sharing （结构共享） 会尽量复用内存。没有被引用的对象会被垃圾回收。
```
import { Map} from 'immutable';
let a = Map({
  select: 'users',
  filter: Map({ name: 'Cam' })
})
let b = a.set('select', 'people');

a === b; // false

a.get('filter') === b.get('filter'); // true

```
上面 a 和 b 共享了没有变化的 `filter` 节点。

3. Undo/Redo(撤销重写)，Copy/Paste，甚至时间回溯这些功能做起来小菜一碟
4. 并发安全
因为js 单线程，所以没啥卵用
5. 拥抱函数式编程
Immutable 本身就是函数式编程中的概念，纯函数式编程比面向对象更适用于前端开发。因为只要输入一致，输出必然一致，这样开发的组件更易于调试和组装。

> 函数式编程的本质：函数式编程中的函数这个术语不是指计算机中的函数（实际上是Subroutine），而是指数学中的函数，即自变量的映射。也就是说一个函数的值仅决定于函数参数的值，不依赖其他状态。比如sqrt(x)函数计算x的平方根，只要x不变，不论什么时候调用，调用几次，值都是不变的。

### Immutable 的缺点
1.  容易与原生对象混淆
虽然 Immutable.js 尽量尝试把 API 设计的原生对象类似，有的时候还是很难区别到底是 Immutable 对象还是原生对象，容易混淆操作。
Immutable 中的 Map 和 List 虽对应原生 Object 和 Array，但操作非常不同，比如你要用 `map.get('key')` 而不是 `map.key`，`array.get(0)` 而不是 `array[0]`。另外 Immutable 每次修改都会返回新对象，也很容易忘记赋值。

当使用外部库的时候，一般需要使用原生对象，也很容易忘记转换。

下面给出一些办法来避免类似问题发生：

- 使用 Flow 或 TypeScript 这类有静态类型检查的工具
- 约定变量命名规则：如所有 Immutable 类型对象以 `$$` 开头。
- 使用 `Immutable.fromJS` 而不是 `Immutable.Map` 或 `Immutable.List` 来创建对象，这样可以避免 Immutable 和原生对象间的混用



## 实践

1. 与 React 搭配使用，Pure Render

SCU 来控制渲染，可以在 `shouldComponentUpdate()` 中使用使用 deepCopy 和 deepCompare 来避免无必要的 `render()`，但 deepCopy 和 deepCompare 一般都是非常耗性能的。

Immutable 则提供了简洁高效的判断数据是否变化的方法，只需 `===` 和 `is` 比较就能知道是否需要执行 `render()`，而这个操作几乎 0 成本，所以可以极大提高性能。修改后的 `shouldComponentUpdate` 是这样的

```
import { is } from 'immutable';


shouldComponentUpdate: (nextProps = {}, nextState = {}) => {
  const thisProps = this.props || {}, thisState = this.state || {};

  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }

  for (const key in nextProps) {
    if (thisProps[key] !== nextProps[key] || ！is(thisProps[key], nextProps[key])) {
      return true;
    }
  }

  for (const key in nextState) {
    if (thisState[key] !== nextState[key] || ！is(thisState[key], nextState[key])) {
      return true;
    }
  }
  return false;
}
```


# 看 xmind 吧


### API
- fromJS

作用：将一个js数据转换为Immutable类型的数据

用法：`fromJS(value, converter)`

简介：value是要转变的数据，converter是要做的操作。第二个参数可不填，默认情况会`将数组准换为List类型，将对象转换为Map类型`，其余不做操作



从 JavaScript 数据生成不可变对象(支持数据嵌套):
```
Immutable.fromJS([1,2])
Immutable.fromJS({a: 1})

```

- toJS()

作用：将一个Immutable数据转换为JS类型的数据

用法：value.toJS()

- is()

作用：对两个对象进行比较

用法：is(map1,map2)

简介：和js中对象的比较不同，在js中比较两个对象比较的是地址，但是在Immutable中比较的是这个对象hashCode和valueOf，只要两个对象的hashCode相等，值就是相同的，避免了深度遍历，提高了性能


- List
- Map

从 JavaScript 数据生成不可变对象(不支持数据嵌套):
```
Immutable.List([1,2]})
Immutable.Map({a: 1})
```


get() 、 getIn()
作用：获取数据结构中的数据

```
 var a = [1, 2, [3, 4, [5, 6]]];
        var b = {
            a: 1,
            b: {
                c: 3,
                d: {
                    e: 5
                }
            }
        };
        a = Immutable.fromJS(a);
        b = Immutable.fromJS(b);
        console.log(a.get(1)); // 2
        console.log(b.get('b')); // Map
        console.log(a.getIn([2, 1])); // 4
        console.log(b.getIn(['b', 'd', 'e'])); // 5
```


- toJS   从不可变数据生成 JavaScript 对象

- is 判断两个数据结构是否相等:
- 



getIn 的操作是什么
update 的使用



## List

定义list

Immutable.List()    空 List
Immutable.List([1,2])
Immutable.fromJS([1,2])

查看 List 的大小:
```
immutableA.size
immutableA.count()
```

判断是否是 List:
```
Immutable.List.isList(immutableData)
```

React 组件 propTypes 判断是否是 List:
```
React.PropTypes.instanceOf(Immutable.List).isRequired
```

获取 List 索引的元素(负数也是能运行的):

```
immutableData.get(0)
immutableData.get(-1) #反向索引
```

通过 getIn 访问嵌套数组当中的数据:

```
immutableData.getIn [1, 2]   这玩意怎么玩
```

List更新操作

```
immutableA = Immutable.fromJS([0, 0, [1, 2]])
immutableB = immutableA.set (1, 1)
immutableC = immutableB.update (1, (x) => x + 1)
immutableC = immutableB.updateIn ([2, 1], (x) => x + 1)
```

sort sortBy

