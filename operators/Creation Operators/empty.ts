/**
 * 创建一个不发射任何值的Observale,它只会发射一个complete通知.
 * 通常用于喝其他操作符一起组合使用.
 */

import { Observable } from 'rxjs';

const result = Observable.empty().startWith(7);
result.subscribe(x => console.log(x));
