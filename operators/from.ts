/**
 * 将一个 数组,类数组,Promise,可迭代对象,类可观察对象,转化为一个Observable
 */

import { Observable } from 'rxjs';

// 数组
const array = [1, 2, 3];
const result = Observable.from(array);
result.subscribe(x => console.log(x));

// 可迭代对象
function* genterateDoubles(seed) {
    let i = seed;
    while (true) {
        yield i;
        i = 2 * i;
    }
}

const iterator = genterateDoubles(3);
const resultItr = Observable.from(iterator as any).take(3);
resultItr.subscribe(x => console.log(x));

// Set
const s = new Set(['foo', window]);
Observable.from(s as any).subscribe(
    x => console.log(`onNext: ${x}`),
    e => console.log(`onError: ${e}`),
    () => console.log('onCompleted'),
);
