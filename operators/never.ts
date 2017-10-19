/**
 * 创建一个不发射任何值的Observable
 */

import { Observable } from 'rxjs';

// 这个静态操作符对 需要创建一个不发射next,error,也不发射complete的简单Observable来说 很有用.
// 它可用于测试或与其他Observable组合.
// 请不要通过never来发射一个complete通知,这个Observable让订阅(subscription)自动处理
// Subscription需要手动处理

function info() {
    console.log('will not be called');
}

const result = Observable.never().startWith(7);
const subscription = result.subscribe(x => console.log(x), info, info);
