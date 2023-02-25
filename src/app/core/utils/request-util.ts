import { HttpParams } from '@angular/common/http';

/**
 * allow create http params to send into request with pagination
 * @param query object with page params
 * @returns http params object with page params
 */
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
