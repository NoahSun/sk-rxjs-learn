/**
 * 包装浏览器提供的兼容w3c的WebSocket对象
 * 返回WebSocketSubject
 */

import { Observable } from 'rxjs';

// 包装浏览器的WebSocket
let socket$ = Observable.webSocket('ws://localhost:8081');

socket$.subscribe(
    msg => console.log('message received: ' + msg),
    e => console.log(e),
    () => console.log('done'),
);

socket$.next(JSON.stringify({ op: 'hello' }));

// 包装nodejs的WebSocket
const w3cWebSocket = require('websocket').w3cwebsocket;
socket$ = Observable.webSocket({
    url: 'ws://localhost:8081',
    WebSocketCtor: w3cWebSocket,
});

socket$.subscribe(
    x => console.log(x),
    e => console.log(e),
    () => console.log('done!'),
);
socket$.next(JSON.stringify({ op: 'hello' }));
