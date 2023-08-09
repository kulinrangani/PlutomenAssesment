import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LibraryserviceService {
  reqUrl: string = 'https://api.workflowdev.pluto-men.com';
  t: string = JSON.parse(localStorage.getItem('token') || '');
  headers_object = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.t}`),
  };
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

  async getAllMachines(): Promise<any> {
    try {
      const data = await this.http
        .get(`${this.reqUrl}/backend/machines/all`, this.headers_object)
        .toPromise();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getMachineTypes(): Promise<any> {
    try {
      const data = await this.http
        .get(`${this.reqUrl}/backend/machine-types/all`, this.headers_object)
        .toPromise();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getSubCategories(): Promise<any> {
    try {
      const data = await this.http
        .get(`${this.reqUrl}/backend/subcategories/all`, this.headers_object)
        .toPromise();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getCategories(): Promise<any> {
    try {
      const data = await this.http
        .get(`${this.reqUrl}/backend/categories/all`, this.headers_object)
        .toPromise();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getLibraryTypes(): Promise<any> {
    try {
      const data = await this.http
        .get(`${this.reqUrl}/backend/library-types/all`, this.headers_object)
        .toPromise();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
