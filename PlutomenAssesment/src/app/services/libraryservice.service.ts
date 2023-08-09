import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LibraryserviceService {
  reqUrl: string = 'https://api.workflowdev.pluto-men.com';
  constructor(private http: HttpClient) {}

  getAllLibraries() {
    let userJson: any = JSON.parse(localStorage.getItem('token') || '');
    localStorage.setItem('token', JSON.stringify(userJson.accessToken));
    let t: string = JSON.parse(localStorage.getItem('token') || '');
    var headers_object = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${t}`),
    };
    let libraries: any;
    this.http
      .get(`${this.reqUrl}/backend/libraries/1/10`, headers_object)
      .subscribe((res) => {
        libraries = res;
        return libraries;
      });
  }
}
