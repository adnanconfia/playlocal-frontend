import { tap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environments';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkedInService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) {}

  getLinkedInDetails(url: any) {
    return this.http.post(this.apiURL.concat('linkedin'), { url }).pipe(
      tap(response => {}),
      shareReplay()
    );
  }
  downloadFile(url: any, quality: any) {
    return this.http
      .post(this.apiURL.concat('downLinkedin'), { url, quality })
      .pipe(
        tap(response => {}),
        shareReplay()
      );
  }
}
