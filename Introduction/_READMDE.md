# 入门

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

## 第一个示例

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

...未完...
