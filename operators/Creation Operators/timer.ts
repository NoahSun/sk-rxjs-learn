/**
 * 创建一个Observable,该Observable在初始延时(initialDelay)指猴开始发送并且在每个时间周期(period)后发出自增的数字.
 */

import { Observable } from 'rxjs';

// 就像是interval,但是你可以指定什么时候开始发送.
// timer返回一个发出无限自增数列的Observable,具有一定的时间间隔,这个间隔有你来选择.
// 第一个发送发生在初始延时之后.初始延时就像是Date.
// 默认情况下,这个操作符使用async调度器来提供时间的概念,但是你也可以传递任何调度器.
// 如果时间周期没有被指定,输出Observable只发出0.否则,会发送一个无限数列.

console.log('start');
// 延迟2秒后,每隔1秒发出一个从0开始的值,执行5次.
const numbers1 = Observable.timer(2000, 1000).take(5);
numbers1.subscribe(x => console.log(x));

// 延迟8秒以后只发出一个0
const numbers2 = Observable.timer(8000);
numbers2.subscribe(x => console.log(x));
