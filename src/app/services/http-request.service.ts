import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private http: HttpClient) {}
  // private url: string = 'https://sandbox6.eureeca.com/Api/';
  private url: string = environment.apiUrl + '/';

  public getRequest(addr: any, options?: any): Observable<any> {
    return this.http.get(this.url + addr, options);
  }
  public postRequest(addr: any, Data?: any, options?: any): Observable<any> {
    return this.http.post(this.url + addr, Data, options);
  }
  public putRequest(addr: any, Data: any): Observable<any> {
    return this.http.put(this.url + addr, Data);
  }
}
