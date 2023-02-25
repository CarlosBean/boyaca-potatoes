import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageParams } from 'src/app/core/models/page-params.model';
import { IPageResponse } from 'src/app/core/models/page-response.model';
import { createQueryParam } from 'src/app/core/utils/request-util';
import { environment } from 'src/environments/environment';
import { ISubscriber, PickSubscriber } from './subscriber.model';

type EntityArrayResponse = IPageResponse<ISubscriber[]>;

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  private resourceUrl = `${environment.API_URL}/subscribers`;

  constructor(private http: HttpClient) {}

  getAllSubscribers(pageParams?: IPageParams): Observable<EntityArrayResponse> {
    const params = createQueryParam(pageParams);
    return this.http.get<EntityArrayResponse>(this.resourceUrl, {
      params,
    });
  }

  getSubscriber(id: number): Observable<ISubscriber> {
    return this.http.get<ISubscriber>(`${this.resourceUrl}/${id}`);
  }

  deleteSub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }

  createOneSubscriber(subscriber: PickSubscriber): Observable<void> {
    const payload = { Subscribers: [subscriber] };
    return this.http.post<void>(this.resourceUrl, payload);
  }

  updateSubscriber(subscriber: PickSubscriber): Observable<void> {
    return this.http.put<void>(
      `${this.resourceUrl}/${subscriber.Id}`,
      subscriber
    );
  }
}
