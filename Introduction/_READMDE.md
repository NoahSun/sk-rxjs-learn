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

**什么是推送？** - 在推送体系中, 由生产者来决定何时把数据发送给消费者. 消费者本身不知道合适会接收到数据.

在当今的 JavaScript 世界中, Promises 是最常见的推送体系类型.
Promise(生产者)将一个解析过的值传递给已注册的回调函数(消费者),但不同于函数的是,由 Promise 来决定何时把值"推送"给回调函数.

RxJS 引入了 Observables, 一个新的 JavaScript 推送体系. Observable 是多个值的生产者, 并将值"推送"给观察者(消费者).

* Function 是惰性的评估运算, 调用时会同步地返回一个单一值.
* Generator 是惰性的评估运算, 调用时会同步地返回零到(有可能的)无限多个值.
* Promise 是最终可能(或可能不)返回单个值的运算.
* Observable 是惰性的评估运算, 它可以从它被调用的时刻起同步或异步地返回零到(有可能的)无限多个值.

### Observables 作为函数的泛化为多个值的函数

---

与流行的说法正好相反, Observables 既不像 EventEmitters, 也不像多个值的 Promises.
在某些情况下, 即当使用 RxJS 的 Subjects 进行多播时, Observables 的行为可能会比较像 EventEmmiters, 但通常情况下 Observables 的行为并不像 EventEmitters.

> Observables 像是没有参数, 但可以泛化为多个值的函数

考虑如下代码:

```javascript
function foo() {
    console.log('hello');
    return 42;
}

var x = foo.call(); //等同于 foo()
console.log(x);
var y = foo.call(); //等同于 foo()
console.log(y);
```

我们期待看到的输出:

```javascript
"hello"
42
"hello"
42
```

```javascript
var foo = Rx.Observable.create(function (observer) {
    console.log('hello');
    observer.next(42);
});

foo.subscribe(function (x) {
    console.log(x);
});
foo.subscribe(function (y) {
    console.log(y);
});
```

输出是一样的:

```javascript
"hello"
42
"hello"
42
```

这是因为函数和 Observables 都是惰性运算.
如果你不调用函数, `console.log('hello')` 就不会执行.
Observables 也是如此, 如果你不"调用"它(使用 subscribe), `console.log('hello')`也不会执行.
此外, "调用"或"订阅"都是独立的操作:
两个函数调用会触发两个单独的副作用, 两个 Observables 订阅同样也是触发两个单独的副作用.
EventEmitters 共享副作用并且无论是否存在订阅者都会尽早执行, Observables 与之相反, 不会共享副作用并且是延迟执行.

> 订阅 Observable 类似于调用函数.

一些人声称 Observables 是异步的. 那还真不是. 如果你用日志包围一个函数调用, 像这样:

```javascript
console.log('before');
console.log(foo.call());
console.log('after');
```

你会看到这样的输出:

```javascript
"before"
"hello"
42
"after"
```

这证明了 `foo` 的订阅完全是同步的, 就像函数一样.

> Observables 传递值可以是同步的, 也可以是异步的.

那么 Observable 和函数的区别是什么呢?
**Observable 可以随着时间的推移"返回"多个值**, 这是函数说做不到的. 你无法这样:

```javascript
function foo() {
    console.log('hello');
    return 42;
    return 100; //是代码, 永远不会执行
}
```

函数只能返回一个值. 但 Observables 可以这样:

```javascript
var foo = Rx.Observable.create(function (observer) {
    console.log('hello');
    observer.next(42);
    observer.next(100);
    observer.next(250);
    // 还可以继续返回更多的值
});

console.log('before');
foo.subscribe(function(x) {
    console.log(x);
});
console.log('after');
```

同步输出:

```javascript
"befor"
"hello"
42
100
250
"after"
```

但你也可以异步地"返回"值:

```javascript
var foo = Rx.Observable.create(function (observer) {
    console.log('hello');
    observer.next(42);
    observer.next(100);
    observer.next(200);
    setTimeout(() => {
        observer.next(300); //异步执行
    }, 1000);

    console.log('before');
    foo.subscribe(function (x) {
        console.log(x);
    });
    console.log('after');
});
```

```javascript
"before"
"hello"
42
100
200
"after"
300
```

结论:

* func.call() 意思是_"同步地给我一个值"_
* observable.subscribe() 意思是_"给我任意数量的值, 无论是同步地还是异步地"_

### Observable 剖析

---

Observables 是使用 Rx.Observable.create 或创建操作符**创建的**,
并使用观察者来**订阅**它, 然后**执行它并发送** `next` / `error` / `complete` 通知给观察者, 而且执行可能会被**清理**.
这四个方面全部编码在 Observables 实例中, 但某些方面是与其他类型相关的, 像 Observer (观察者) 和 Subscription (订阅).

Observable 的核心关注点:

* **创建** Observables
* **订阅** Observables
* **执行** Observables
* **清理** Observables

#### 创建 Observables

Rx.Observable.create 是 Observable 构造函数的别名, 它接收一个参数:

未完...
