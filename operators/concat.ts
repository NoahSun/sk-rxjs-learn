/**
 * 产生一个新的Observable.参数为Observable,并顺序发出所有Observable的值
 */

import { Observable } from 'rxjs';

const timer = Observable.interval(1000).take(3);
const sequence = Observable.range(1, 4);
const arr = Observable.from([1, 2, 3]);
const result = Observable.concat(timer, sequence, arr);
result.subscribe(x => console.log(x));
