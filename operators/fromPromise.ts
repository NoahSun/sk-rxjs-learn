/**
 * 把一个ES2015 Promise转换为一个Observable.
 * 如果Promise为成功状态,则Observable会将成功的值作为next发出,然后complete.
 * 如果Promise为失败状态,则Observable会将失败的值作为error发出.
 */

import { Observable } from 'rxjs';
import * as RSVP from 'rsvp';

// 转换一个Fetch返回的Promise为Observable
const fetchObservable = Observable.fromPromise(fetch('some/server'));
fetchObservable.subscribe(
    x => console.log(x),
    e => console.log(e),
    () => console.log('done'),
);

// 创建一个Promise来resolve或reject一个值
const skPromise = new RSVP.Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
        resolve('ok');
    } else {
        reject('error');
    }
});

const promiseObservable = Observable.fromPromise(skPromise);
promiseObservable.subscribe(
    x => console.log(x),
    e => console.log(e),
    () => console.log('done'),
);
