import { Observable } from 'rxjs';
import { EventTargetLike } from 'rxjs/observable/FromEventObservable';

/* const button: EventTargetLike | null = document.querySelector('button');
Observable.fromEvent<number>(button as EventTargetLike, 'click')
    .scan<number>(count => count + 1, 0)
    .subscribe(count => console.log('Clicked ${count} times')); */

Observable.interval(1000).take(3).scan((acc, value, index) => {
    console.log(acc, value, index);
    return acc + 1;
}, 0).subscribe(x => console.log(x));
