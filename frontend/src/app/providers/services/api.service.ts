import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { JwtService } from './jwt.service';
//import { APP_SETTINGS } from '../../../settings';

@Injectable()
export class ApiService {
  baseUrl: string = `${environment.apiUrl}/${environment.apiPrefix}/${environment.apiVersion}`;

  constructor(
    private http: Http,
    private jwtService: JwtService
  ) {}

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    }

    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
     let res = error.json();
     return Observable.throw(res);
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${this.baseUrl}${path}`, { headers: this.setHeaders(), search: params })
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.baseUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.baseUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }
}
