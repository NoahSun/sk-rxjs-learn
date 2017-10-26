/**
 * 将一个 数组,类数组,Promise,可迭代对象,类可观察对象,转化为一个Observable
 */

import { Observable } from 'rxjs';
import { IteratorObservable } from 'rxjs/observable/IteratorObservable';

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
// 使用迭代器可观察对象来创建实例
const resultItr = IteratorObservable.create(iterator).take(3);
resultItr.subscribe(x => console.log(x));

// Set
const s = new Set(['foo', 1]);
// 使用迭代器可观察对象来创建实例
IteratorObservable.create(s).subscribe(
    x => console.log(`onNext: ${x}`),
    e => console.log(`onError: ${e}`),
    () => console.log('onCompleted'),
);
