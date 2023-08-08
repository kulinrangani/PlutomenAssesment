import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  libraries: any;
  listOfLibraries: any[] = [];
  reqUrl: string = 'https://api.workflowdev.pluto-men.com';
  ngOnInit(): void {
    let userJson: any = JSON.parse(localStorage.getItem('token') || '');
    localStorage.setItem('token', JSON.stringify(userJson.accessToken));
    let t: string = JSON.parse(localStorage.getItem('token') || '');
    var headers_object = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${t}`),
    };

    this.http
      .get(`${this.reqUrl}/backend/libraries/1/10`, headers_object)
      .subscribe(
        (res) => {
          this.libraries = res;
          this.listOfLibraries = this.libraries.docs;
          console.log(this.listOfLibraries);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
