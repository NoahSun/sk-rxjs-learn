/**
 * Observable返回一个周期性的(interval)无限递增的整数数列.
 * 第一个参数为时间间隔.需要注意的是,第一个发射值不会立即发射,而是在第一个周期过去指猴发送.
 * 第二个参数默认情况下为异步调度程序提供时间概念,但可以将任何调度程序传递给它
 */

import { Observable } from 'rxjs';

const numbers = Observable.interval(1000).map((value, index) => {
    return { value, index };
});

numbers.subscribe(x => console.log(x));

const source = Observable.interval(500).timeInterval().take(3);
const subscription = source.subscribe(
    x => console.log(x),
    e => console.log(e),
    () => console.log('done'),
);
