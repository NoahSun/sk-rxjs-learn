/**
 * 创建一个新的Observable,当被订阅时,它将执行指定的函数.
 * create将subscribe函数转换为实际的Observable.这相当于调用Observable构造函数.
 * 大多数时候,你不需要使用create,因为现有的创建操作符(以及实例组合运算符)允许你为大多数用例创建一个Observable.
 * 但是create是低级的,并且能够创建任何Observable.
 */
import { Observable, Observer, Subscriber } from 'rxjs';

const result: Observable<number> = Observable.create((subscriber: Subscriber<number>) => {
    subscriber.next(Math.random());
    subscriber.next(Math.random());
    subscriber.next(Math.random());
    subscriber.complete();
});
result.subscribe(x => console.log(x));
