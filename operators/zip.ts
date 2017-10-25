/**
 * 将多个Observable组合以创建一个Observable,该Observable的值是由所有输入Observables的值按照顺序计算而来的.
 * 如果最后一个参数是函数,这个函数呗用来计算最终发出的值.否则,返回一个顺序包含所有输入值的数组.
 */

import { Observable } from 'rxjs';

const age$ = Observable.of<number>(27, 25, 29);
const name$ = Observable.of<string>('Foo', 'Bar', 'Beer');
const isDev$ = Observable.of<boolean>(true, false, true);

// 返回一个Observable
const newObservable = Observable.zip(
    age$, name$, isDev$,
    (age: number, name: string, isDev: boolean) => ({ age, name, isDev }),
);

newObservable.subscribe(
    x => console.log(x),
    e => console.log(e),
    () => console.log('done!'),
);
