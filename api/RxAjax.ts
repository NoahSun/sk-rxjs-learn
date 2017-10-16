import { ajax } from 'rxjs/observable/dom/ajax';
export const RxAjax = (url) => ajax.get(url);
