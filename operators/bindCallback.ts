import { Observable } from 'rxjs';
import * as $ from 'jquery';

import { ApiConfig } from '../api/config';
const getAsObservable = Observable.bindCallback($.get);
const result = getAsObservable('https://cdn.bootcss.com/jquery/3.2.1/core.js');
result.subscribe({
    next: (x) => {
        console.log(x);
    },
    error: (err) => {
        console.log(err);
    },
});
