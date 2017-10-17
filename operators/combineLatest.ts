/**
 * 组合多个Observable产生一个新的Observable,它所有输入的最新子作为他的发射值计算。
 */
import { Observable } from 'rxjs';

const weight = Observable.of(60);
const height = Observable.of(1.65, 1.70, 1.75);
const bmi = Observable.combineLatest(weight, height, (w, h) => w / (h ** 2));
bmi.subscribe(x => console.log('BMI is ' + x));
