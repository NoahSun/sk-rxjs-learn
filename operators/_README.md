# Operators(操作符)

尽管RxJS的根基是Observable,但最有用的还是它的**操作符**.操作符是允许复杂的异步代码以声明式的方式进行轻松组合的基础代码单元.

## 什么是操作符? 
---
&emsp;&emsp;操作符是Observable类型上的 **方法** ,比如 `.map` , `.filter()` , `.merge()`,等等.当操作符被调用时,他们不会 **改变** 已经存在的Observable实例.相反,它们返回一个 **新的** Observable,它的subscription逻辑基于第一个Observable.

> 总结: 操作符是函数,它基于当前的 *Observable* 创建一个新的 *Observable*. 这是一个无副作用的操作: 前面的 *Observable* 保持不变.

&emsp;&emsp;操作符本质上是一个纯函数(pure function), 它接收一个 Observable 作为输入, 并生成一个新的 Observable 作为输出. 订阅 `输出Observable` 同样会订阅 `输入Observable` . 在下面示例中,我们创建一个自定义操作符函数,它将 `输入Observable`接收的每个值都乘以10:
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

未完...