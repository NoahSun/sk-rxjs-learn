import { Observable } from 'rxjs';
import { EventTargetLike } from 'rxjs/observable/FromEventObservable';

const button: EventTargetLike | null = document.querySelector('button');
Observable.fromEvent(button as EventTargetLike, 'click')
    .subscribe(() => console.log('Clicked!'));
