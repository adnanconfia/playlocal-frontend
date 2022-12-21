import { environment } from './../../assets/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SearchVideoService {
  apiRoot = environment.apiURL;

  constructor(private http: HttpClient) {}
  GetVedioDetails(url: any) {
    return this.http.post(this.apiRoot.concat('videodetails'), { url }).pipe(
      tap(response => {}),
      shareReplay()
    );
  }
  DownloadVideo(url: any, quality: any) {
    return this.http
      .post(this.apiRoot.concat('download'), { url, quality })
      .pipe(
        tap(response => {}),
        shareReplay()
      );
  }
}
