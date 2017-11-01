import { Observable } from 'rxjs';
import { EventTargetLike } from 'rxjs/observable/FromEventObservable';

const button: EventTargetLike | null = document.querySelector('button');
Observable.fromEvent<MouseEvent>(button as EventTargetLike, 'click')
    .throttleTime(1000)
    .map(event => event.clientX)
    .scan((count, clientX) => count + clientX, 0)
    .subscribe(count => console.log(count));
