import { Observable } from 'rxjs';
import * as path from 'path';
import * as fs from 'fs';

const readFileAsObservable = Observable.bindNodeCallback(fs.readFile);
const result = readFileAsObservable(path.join(__dirname, '../tslint.json'));
result.subscribe(
    x => console.log(x.toString()),
    e => console.log(e),
    () => console.log('done!'),
);
