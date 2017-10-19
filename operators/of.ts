/**
 * 创建一个Observable,它发射一些你指定的参数值,一个接一个的立即发射,只到发射一个complete通知
 */

import { Observable } from 'rxjs';

/**
 * 这个静态操作符非常有用,用于创建一个简单的可观察到的,只发出给定的参数,以及随后的完整通知.
 * 它可以被用于和其他Observable的组合,例如".concat()".
 * 默认情况下,它用的是一个null的IScheduler,这意味着next通知是同步发送的,虽然有不同的IScheduler的可能性,但是也能确定这些通知在什么时候被送达
 */

const numbers = Observable.of(1, 2, 3);
const letters = Observable.of('a', 'b', 'c');
const interval = Observable.interval(1000).timeInterval().take(3);

const result = numbers.concat(letters).concat(interval);
result.subscribe(x => console.log(x));
