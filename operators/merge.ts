/**
 * 创建一个合并其他Observable的Observable
 */

import { Observable } from 'rxjs';

const clicks = Observable.fromEvent(document, 'click');
const timer = Observable.interval(1000);
const clicksOrTimer = Observable.merge(clicks, timer);

clicksOrTimer.subscribe(x => console.log(x));

// 合并3个Observable,但是只有2个同时会运行
// .timerInterval() 返回interval的相关信息{value: number, interval: number}
const timer1 = Observable
    .interval(1000)
    .timeInterval()
    .map(val => Object.assign({}, val, { name: 'timer1' }))
    .take(3);
const timer2 = Observable
    .interval(2000)
    .timeInterval()
    .map(val => Object.assign({}, val, { name: 'timer2' }))
    .take(3);
const timer3 = Observable
    .interval(500)
    .timeInterval()
    .map(val => Object.assign({}, val, { name: 'timer3' }))
    .take(3);

// .pluck() 采集一个Object中直接嵌套的属性并返回该值
const source1 = Observable
    .interval(100)
    .timeInterval()
    .map(v => Object.assign({}, v, {
        m: {
            value: 123,
        },
    }))
    .pluck('m')
    .pluck('value');

const source2 = Observable
    .interval(150)
    .timeInterval()
    .pluck('interval');

const source = Observable
    .merge(source1, source2)
    .take(10);

const subscription = source.subscribe(
    x => {
        console.log('Next: ' + x);
    },
    err => {
        console.log('Error: ' + err);
    },
    () => {
        console.log('Completed');
    },
);
