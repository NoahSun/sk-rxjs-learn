/**
 * 并行运行所有可观察序列并收集其最后的发射值
 */

import { Observable } from 'rxjs';
import * as RSVP from 'rsvp';

const source = Observable.forkJoin(
    Observable.range(0, 10),
    Observable.from([1, 2, 3]),
    RSVP.Promise.resolve(56),
);

const subscription = source.subscribe(
    x => console.log(x),
    e => console.log(e),
    () => console.log('done'),
);
