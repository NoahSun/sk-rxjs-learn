/**
 * 创建一个发射指定范围内的数字序列的Observable
 */

import { Observable } from 'rxjs';

// range操作符顺序发出一个区间范围内的连续整数,你可以决定区间的开始和长度.
// 默认情况下不适用调度器,仅仅同步的发送通知,但是也可以可选的使用可选的调度器来控制发送

const numbers = Observable.range(1, 3);
numbers.subscribe(x => console.log(x));
