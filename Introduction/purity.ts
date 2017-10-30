import { Observable } from 'rxjs';
import { EventTargetLike } from 'rxjs/observable/FromEventObservable';

const button: EventTargetLike | null = document.querySelector('button');
Observable.fromEvent<number>(button as EventTargetLike, 'click')
    .scan<number>(count => count + 1, 0)
    .subscribe(count => console.log('Clicked ${count} times'));
