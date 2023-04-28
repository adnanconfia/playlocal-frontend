import { environment } from './../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SearchVideoService {
  apiRoot = environment.apiURL;
  downloaded = false;
  VideoDetails: any = null;

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
  DeleteFile(url: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        url: url
      }
    };
    return this.http.delete(this.apiRoot.concat('videodetails'), options).pipe(
      tap(response => {}),
      shareReplay()
    );
  }
  DownloadAudio(url: any, abr: any) {
    return this.http.post(this.apiRoot.concat('download'), { url, abr }).pipe(
      tap(response => {}),
      shareReplay()
    );
  }
  DownloadFile(url: any) {
    return this.http
      .get<Blob>(url, { observe: 'response', responseType: 'blob' as 'json' })
      .pipe(
        tap(response => {}),
        shareReplay()
      );
  }
}
