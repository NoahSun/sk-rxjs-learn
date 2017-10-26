# Operators(操作符)

尽管RxJS的根基是Observable,但最有用的还是它的**操作符**.操作符是允许复杂的异步代码以声明式的方式进行轻松组合的基础代码单元.

## 什么是操作符? 
---
操作符是Observable类型上的 **方法** ,比如 `.map` , `.filter()` , `.merge()`,等等.当操作符被调用时,他们不会 **改变** 已经存在的Observable实例.相反,它们返回一个 **新的** Observable,它的subscription逻辑基于第一个Observable.

> 总结: 操作符是函数,它基于当前的 *Observable* 创建一个新的 *Observable*. 这是一个无副作用的操作: 前面的 *Observable* 保持不变.

操作符本质上是一个纯函数(pure function), 它接收一个 Observable 作为输入, 并生成一个新的 Observable 作为输出. 订阅 `输出Observable` 同样会订阅 `输入Observable` . 在下面示例中,我们创建一个自定义操作符函数,它将 `输入Observable`接收的每个值都乘以10:
```javascript
    function multiplyByTen(input) {
        const output = Rx.Observable.create(observer => {
            input.subscribe({
                next: v => observer.next(v * 10),
                error: e => observer.error(e),
                complete: () => observer.complete('done!'),
            });
        });
        return output;
    }
```
输出:
```
10
20
30
40
```

> **注意:** 订阅 `输出Observable` 会导致 `输入Observable` 也被订阅.我们称之为"操作符订阅链".

## 实例操作符 vs. 静态操作符
---
**什么是实例操作符?** - 通常提到操作符时,我们值得是**实例**操作符,它是 Observable 实例上的方法. 举例来说, 如果上面的 `multiplyByTen` 是官方提供的实例操作符, 那么它看起来大概是这个样子的:
```javascript
Rx.Observable.prototype.multiplyByTen = function multiplyByTen() {
    var input = this;
    return Rx.Observable.create(function subscribe(observer) {
        input.subscribe({
            next: v => observer.next(10 * v),
            error: e => observer.error(e),
            complete: () => observer.complete()
        });
    });
}
```
> 实例运算符是使用 **this** 关键字来指代输入的 *Observable* 的函数.

注意, 这里的 `输入Observable` 不再是一个函数参数, 它现在是 `this` 对象. 下面是我们如何使用这样的实例运算符:
```javascript
var observable = Rx.Observable.from([1,2,3,4]).mulityByTen();

observable.subscribe(x => console.log(x));
```

**什么是静态操作符?** - 除了实例操作符, 还有静态操作符, 它们是直接附加到 Observable 类上的. 静态操作符在内部不使用 `this` 关键字, 而是完全依赖于它的参数.
> 静态操作符是附加到 *Observable* 类上的纯函数, 通常是用来从头开始创建 *Observable*.

最常用的静态操作符类型是所谓的 `创建操作符`. 它们值接收非 Observable 参数, 比如数字, 然后**创建**一个新的 Observable, 而不是将一个 `输入Observable` 转换为 `输出Observable`.

一个典型的静态操作符例子就是 `interval` 函数. 它接收一个数字(非 Observable) 作为参数, 并生产一个 Observable 作为输出:

```javascript
var observable = Rx.Observable.interva(1000/* 毫秒数 */);
```

创建操作符的另外一个例子就是 `create`, 已经在前面的示例中广泛使用. [查看所有静态操作符列表](http://cn.rx.js.org/manual/overview.html#h39).

然而, 有些静态操作符可能不同于简单的创建, 一些 **组合操作符** (可能是静态的), 比如 `merge`, `combineLastest`, `concat`, 等等. 这些作为静态运算符是有道理的, 因为它们将**多个** Observable 作为输入, 而不仅仅是一个, 例如:

```javascript
var observable1 = Rx.Observable.interval(1000);
var observable2 = Rx.Observable.interval(400);

var merged = Rx.Observable.merge(observable1, observable2);
```

## Marble diagrams (弹珠图)


![弹珠图](/assets/images/marble-diagram-anatomy.svg)