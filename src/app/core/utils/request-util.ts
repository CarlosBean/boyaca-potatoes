import { HttpParams } from '@angular/common/http';

export const createQueryParam = (query?: any): HttpParams => {
  let params: HttpParams = new HttpParams();

  if (query) {
    Object.keys(query).forEach(key => {
      if (query[key]) {
        for (const value of [].concat(query[key]).filter(v => v !== '')) {
          params = params.append(key, value);
        }
      }
    });
  }

  return params;
};
