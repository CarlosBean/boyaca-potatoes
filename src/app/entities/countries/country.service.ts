import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageParams } from 'src/app/core/models/page-params.model';
import { IPageResponse } from 'src/app/core/models/page-response.model';
import { createQueryParam } from 'src/app/core/utils/request-util';
import { environment } from 'src/environments/environment';
import { ICountry } from './country.model';

type EntityArrayResponse = IPageResponse<ICountry[]>;

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private resourceUrl = `${environment.API_URL}/countries`;

  constructor(private http: HttpClient) {}

  getAllCountries(pageParams?: IPageParams): Observable<EntityArrayResponse> {
    const params = createQueryParam(pageParams);
    return this.http.get<EntityArrayResponse>(this.resourceUrl, {
      params,
    });
  }
}
