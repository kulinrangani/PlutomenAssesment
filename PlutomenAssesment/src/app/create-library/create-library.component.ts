import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { LibraryserviceService } from '../services/libraryservice.service';

@Component({
  selector: 'app-create-library',
  templateUrl: './create-library.component.html',
  styleUrls: ['./create-library.component.css'],
})
export class CreateLibraryComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private service: LibraryserviceService
  ) {}
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
    this.machines = await this.service.getAllMachines();
    this.machineTypes = await this.service.getMachineTypes();
    this.subCategories = await this.service.getSubCategories();
    this.categories = await this.service.getCategories();
    this.libraryTypes = await this.service.getLibraryTypes();
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
