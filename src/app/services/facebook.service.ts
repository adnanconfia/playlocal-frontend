import { environment } from './../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  apiRoot = environment.apiURL;

  constructor(private http: HttpClient) {}
  getFbVideoDetails(url: any) {
    return this.http.post(this.apiRoot.concat('fbvideo'), { url }).pipe(
      tap(response => {}),
      shareReplay()
    );
  }
}
