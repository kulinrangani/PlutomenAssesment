import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-library',
  templateUrl: './create-library.component.html',
  styleUrls: ['./create-library.component.css'],
})
export class CreateLibraryComponent implements OnInit {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}
  libraries: any;
  listOfLibraries: any[] = [];
  reqUrl: string = 'https://api.workflowdev.pluto-men.com';
  t: string = JSON.parse(localStorage.getItem('token') || '');
  headers_object = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.t}`),
  };
  machines: any;
  machineTypes: any;
  subCategories: any;
  categories: any;
  libraryTypes: any;
  lib: any;
  libraryForm!: FormGroup;

  async ngOnInit(): Promise<void> {
    this.libraryForm = this.formBuilder.group({
      name: '',
      description: '',
      machineId: '',
      machineTypeId: '',
      libraryTypeId: '',
      categoryId: '',
      subcategoryId: '',
    });

    await this.getAllMachines();
    await this.getMachineTypes();
    await this.getSubCategories();
    await this.getCategories();
    await this.getLibraryTypes();
  }

  async getAllMachines() {
    try {
      const data = await this.http
        .get(`${this.reqUrl}/backend/machines/all`, this.headers_object)
        .toPromise();
      this.machines = data;
    } catch (error) {
      console.error(error);
    }
  }

  async getMachineTypes() {
    try {
      const data = await this.http
        .get(`${this.reqUrl}/backend/machine-types/all`, this.headers_object)
        .toPromise();
      this.machineTypes = data;
    } catch (error) {
      console.log(error);
    }
  }

  async getSubCategories() {
    try {
      const data = await this.http
        .get(`${this.reqUrl}/backend/subcategories/all`, this.headers_object)
        .toPromise();
      this.subCategories = data;
    } catch (error) {
      console.log(error);
    }
  }

  async getCategories() {
    try {
      const data = await this.http
        .get(`${this.reqUrl}/backend/categories/all`, this.headers_object)
        .toPromise();
      this.categories = data;
    } catch (error) {
      console.log(error);
    }
  }

  async getLibraryTypes() {
    try {
      const data = await this.http
        .get(`${this.reqUrl}/backend/library-types/all`, this.headers_object)
        .toPromise();
      this.libraryTypes = data;
    } catch (error) {
      console.log(error);
    }
  }

  async createLibrary() {
    const formData = this.libraryForm.getRawValue();
    try {
      const lib = await this.http
        .post(
          `${this.reqUrl}/backend/libraries/`,
          formData,
          this.headers_object
        )
        .toPromise();
      this.lib = lib;
      alert(`Library created With id ${this.lib.id}`);
    } catch (error) {
      console.log(error);
    }
  }
}
