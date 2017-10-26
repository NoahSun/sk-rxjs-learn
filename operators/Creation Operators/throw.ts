/**
 * 创建一个不发送数据给观察者并立马发出错误通知的Observable.
 * 仅仅发出error通知
 */

import { Observable } from 'rxjs';

// 这个静态操作符对于创建简单的只发出error通知的Observable十分有用.
// 可以被用来和其他Obserbale组合,比如在mergeMap中使用.

const error = Observable.throw(new Error('opps!')).startWith(7);
error.subscribe(x => console.log(x), e => console.log(e));

const interval = Observable.interval(1000).take(4);
const result = interval.mergeMap(x => x === 3
    ? Observable.throw('three are bad')
    : Observable.of('a', 'b', 'c'),
);
result.subscribe(x => console.log(x), e => console.log(e));
