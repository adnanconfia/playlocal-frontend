import { environment } from './../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  apiUrl = environment.apiURL;
  constructor(private http: HttpClient) {}

  getInstaDetails(url: any) {
    return this.http.post(this.apiUrl.concat('instavideo'), { url }).pipe(
      tap(response => {}),
      shareReplay()
    );
  }
}
