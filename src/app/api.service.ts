import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestCode } from './model/request-code';
import { Authorize } from './model/authorize';
import { Add } from './model/add';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient: HttpClient) { }

  postRequest(request: RequestCode): Observable<any> {
    return this.httpclient.post("https://getpocket.com/v3/oauth/request", request);
  }

  postAuthorize(auth: Authorize){
    return this.httpclient.post("https://getpocket.com/v3/oauth/authorize", auth);
  }

  postAddToList(add: Add){
    return this.httpclient.post("https://getpocket.com/v3/add", add);
  }
}
