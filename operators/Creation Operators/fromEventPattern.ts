/**
 * 通过使用addHandler和removeHandler函数添加和删除处理程序.
 * 当输出Observable被订阅时,addHandler被调用,并且当订阅被取消时调用removeHandler
 */

import { Observable } from 'rxjs';
import * as $ from 'jquery';

function addClickHandler(handler) {
    document.addEventListener('click', handler);
}

function removeClickHandler(handler) {
    document.removeEventListener('click', handler);
}

const clicks = Observable.fromEventPattern(
    addClickHandler,
    removeClickHandler,
);
clicks.subscribe(x => console.log(x));

// jquery
const input = $('#input');

function add(h) {
    input.bind('click', h);
}

function remove(h) {
    input.unbind('click', h);
}

const source = Observable.fromEventPattern(
    add,
    remove,
);

const subscription = source.subscribe(
    x => console.log('Next: clicked!'),
    e => console.log('Error: ' + e),
    () => console.log('done!'),
);
