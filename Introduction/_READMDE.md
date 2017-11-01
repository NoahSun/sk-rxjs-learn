# 概览

## 入门

RxJS是一个库, 它通过使用可观察的序列来编写异步和基于事件的程序. 它提供了一个核心类型 [Observable](#Observable), 附属类型(Observer, Schedulers, Subjects) 和受Array附属方法的启发的操作符(`.map`, `.filter`, `.reduce`, `.every`, 等),这些数组操作符可以把异步事件作为集合来处理.

> 可以把 RxJS 当做是用来处理时间的 Lodash.

ReactiveX 结合了 [观察者模式](https://en.wikipedia.org/wiki/Observer_pattern), [迭代模式](https://en.wikipedia.org/wiki/Iterator_pattern#JavaScript), [使用集合的函数式编成](http://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions), 以满足一种李享方式来管理时间序列所需要的一切.

在 RxJS 中用来解决异步时间管理的基本概念是:

* **Observable (可观察对象):** 表示一个概念, 这个概念是一个可调用未来值或事件的集合.
* **Observer (观察者):** 一个回调函数的集合, 它知道如何去监听由 Observable 提供的值.
* **Subscription (订阅):** 表示 Observable 的执行, 主要用于取消 Observable 的执行.
* **Opertators (操作符):** 采用函数式编程风格的纯函数(pure function), 使用像 `.map`, `.filter`, `.concat`, `.flatMap`, 等这样的操作符来处理集合.
* **Subject (主题):** **相当于 `EventEmitter`, 并且是将值或事件`多路推送`给多个 Observer 的`唯一方式`**.
* **Schedulers (调度器):** 用来控制并发并且是中央集权的调度员, 允许我们在发生计算时进行协调, 例如 `setTimeout` 或 `requestAnimationFrame` 或 `其他`.

### 第一个示例

---

注册时间监听器的常规写法.

```javascript
var button = document.querySelector('button');
button.addEventListener('click', (e) => console.log('Clicked!'));
```

使用 RxJS 的话, 创建一个 Observable 来代替.

```javascript
var button = document.querySelector('button');
Rx.Observable.fromEvent(button. 'click')
    .subscribe(e => console.log('Clicked!'));
```

### 纯净性(Purity)

---

使得 RxJS 强大的正是它使用纯函数来产生值的能力. 这意味着你的代码更不容易出错.

通常你会创建一个非纯函数, 这个函数之外也使用了共享变量的代码会把你的应用状态搞得一团糟.

```javascript
var count = 0;
var button = document.querySelector('button');
button.addEventListener('click', () => console.log(`Clicked ${++count} times`));
```

使用 RxJS 的话, 你将可以把应用状态隔离出来.

```javascript
var button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
    .scan(count => count + 1, 0)
    .subscribe(count => console.log(`Clicked ${count} times`));
```

**scan** 操作符的工作原理与数组的 **reduce** 类似. 它需要一个暴露给回调函数当参数的初始值. 每次回调函数运行后的返回值会作为下次回调函数运行时的参数.

### 流动性(Flow)

RxJS 提供了一整套操作符来帮助你控制事件如何流经 Observables.

下面的代码展示的是如何控制一秒内最多点击一次, 先来看使用普通的 JavaScript:

```javascript
var count = 0;
var rate = 1000;
var lastClick = Data.now() - rate;
var button = document.querySelector('button');
button.addEventListener('click', () => {
    if(Date.now() - lastClick >= rate) {
        console.log(`Clicked ${++count} times`);
        lastClick = Data.now();
    }
});
```

使用 RxJS:

```javascript
var button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
    .throttleTime(1000)
    .scan(count => count + 1, 0)
    .subscribe(count => console.log(`Clicked ${count} times`));
```

其他流程控制操作符有 `.filter`, `.delay`, `.debounceTime`, `.take`, `.takeUtil`, `.distinct`, `.distinctUntilChanged` 等等.

### 值(Values)

---

对于流经 Observables 的值, 你可以对其进行转换.

下面的代码展示的是如何累加每次点击的鼠标 x 坐标, 先来看看使用普通的 JavaScript:

```javascript
var count = 0;
var rate = 1000;
var lastClick = Date.now() - rate;
var button = document.querySelector('button')l
button.addEventListener('click', e => {
    if(Date.now() - lastClick >= rate) {
        count += e.clientX;
        console.log(count);
        lastClick = Date.now();
    }
});
```

使用 RxJS:

```javascript
var button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
    .throttleTime(1000)
    .map(e => e.clientX)
    .scan((count, clientX) => count + clientX, 0)
    .subcribe(sum => console.log(sum));
```

其他产生值的操作符有 `.pluck`, `.pairwise`, `sample` 等等.

## Observable (可观察对象)

---

Observable 是多个值的惰性推送集合. 它填补了下面表格中的空白:

|      | 单个值                                                                                                  | 多个值                                                                                            |
| ---- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 拉取 | [Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)                     | [Iterator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols) |
| 推送 | [Promise](https://developer.mozilla.org/zh-CN/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise) | [Obsevable](http://cn.rx.js.org/class/es6/Observable.js~Observable.html)                          |

未完...
