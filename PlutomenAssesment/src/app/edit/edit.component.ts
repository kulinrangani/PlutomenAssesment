import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  libraryId: any;
  libraries: any;
  listOfLibraries: any[] = [];
  library: any;
  reqUrl: string = 'https://api.workflowdev.pluto-men.com';
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.libraryId = this.route.snapshot.paramMap.get('id');
    let t: string = JSON.parse(localStorage.getItem('token') || '');
    var headers_object = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${t}`),
    };

    this.http
      .get(`${this.reqUrl}/backend/libraries/1/100`, headers_object)
      .subscribe(
        (res) => {
          this.libraries = res;
          this.listOfLibraries = this.libraries.docs;
          this.listOfLibraries.map((lib) => {
            if (lib._id == this.libraryId) {
              this.library = lib;
            }
          });
          console.log(this.library);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
