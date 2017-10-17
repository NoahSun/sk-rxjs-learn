/**
 * 将一个元素上的时间转化为一个Observable
 * 
 * //!注意:使用jQuery,Zepto,Backbone,Marionette,AngularJS和Ember.js的库方法,并且如果不存在,则退回到本地绑定.
 * //!     如果你使用AMD,你可能需要将这些库作为RxJS的依赖关系包括在requirejs配置文件中.当决定使用哪个库时,RxJS将尝试检测它们的存在
 */

import { Observable } from 'rxjs';
import { EventEmitter } from 'events';

// html-event
if (document) {
    const clicks = Observable.fromEvent(document, 'click');
    clicks.subscribe(x => console.log(x));
}

// nodejs
const eventEmitter = new EventEmitter();
const source = Observable.fromEvent(
    eventEmitter,
    'sk-send-data',
    (...args) => ({ foo: args[0], bar: args[1] }),
);
const subscription = source.subscribe(
    x => console.log(`Next: foo - ${x.foo}, bar - ${x.bar}`),
    e => console.log(`Error: ${e}`),
    () => console.log('done!'),
);
eventEmitter.emit('sk-send-data', 'foo-sk', 'bar-sk');
