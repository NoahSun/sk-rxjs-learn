/**
 * 参数为一个Observable的工厂函数,当被订阅时工厂函数被调用,产生一个可观察对象.
 * defer允许你尽在Observer订阅时创建Observable,并为每个Observer创建一个新的Observabel.
 * 它等待一个Observer订阅它,然后它生成一个Observable,通常有一个Observable工厂函数.
 * 它为每一个订阅者分别重新初始化一个Observable,所以虽然每个用户可能认为它们是订阅的同一个Observable,但事实上每个订阅者都有自己的单独的Observable
 */

import { Observable } from 'rxjs';
import * as RSVP from 'rsvp';

const clicksOrInterval = Observable.defer(() => {
    if (Math.random() > 0.5 && document) {
        return Observable.fromEvent(document, 'click');
    } else {
        return Observable.interval(1000).take(3);
    }
});
clicksOrInterval.subscribe(
    x => console.log(x),
    e => console.log(e),
    () => console.log('clicksOrInterval done!'),
);

const source = Observable.defer(() => RSVP.Promise.resolve(42));

const subscription = source.subscribe(
    x => console.log(x),
    e => console.log(e),
    () => console.log('source done!'),
);
