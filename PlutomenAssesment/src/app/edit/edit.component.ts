import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LibraryserviceService } from '../services/libraryservice.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private service: LibraryserviceService
  ) {}
  libraryId: any;
  libraries: any;
  listOfLibraries: any[] = [];
  library: any;
  reqUrl: string = 'https://api.workflowdev.pluto-men.com';
  machines: any;
  machineTypes: any;
  subCategories: any;
  categories: any;
  libraryTypes: any;
  lib: any;
  libraryForm!: FormGroup;
  t: string = JSON.parse(localStorage.getItem('token') || '');
  headers_object = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.t}`),
  };

  async ngOnInit(): Promise<void> {
    this.libraryId = this.route.snapshot.paramMap.get('id');
    await this.getCurrentLibrary();

    this.libraryForm = this.formBuilder.group({
      name: ``,
      description: ``,
      machineId: ``,
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
    this.setFormValue();
  }

  setFormValue() {
    this.libraryForm.get('name')?.setValue(this.library!.name);
    this.libraryForm.get('description')?.setValue(this.library!.description);
    this.libraryForm.get('machineId')?.setValue(this.library!.machineId._id);
    this.libraryForm
      .get('machineTypeId')
      ?.setValue(this.library!.machineTypeId._id);
    this.libraryForm
      .get('libraryTypeId')
      ?.setValue(this.library!.libraryTypeId._id);
    this.libraryForm.get('categoryId')?.setValue(this.library!.categoryId._id);
    this.libraryForm
      .get('subcategoryId')
      ?.setValue(this.library!.subcategoryId._id);
  }

  async getCurrentLibrary() {
    this.http
      .get(`${this.reqUrl}/backend/libraries/1/100`, this.headers_object)
      .subscribe(
        (res) => {
          this.libraries = res;
          this.listOfLibraries = this.libraries.docs;
          this.listOfLibraries.map((lib) => {
            if (lib._id == this.libraryId) {
              this.library = lib;
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  // async getAllMachines() {
  //   try {
  //     const data = await this.http
  //       .get(`${this.reqUrl}/backend/machines/all`, this.headers_object)
  //       .toPromise();
  //     this.machines = data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async getMachineTypes() {
  //   try {
  //     const data = await this.http
  //       .get(`${this.reqUrl}/backend/machine-types/all`, this.headers_object)
  //       .toPromise();
  //     this.machineTypes = data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async getSubCategories() {
  //   try {
  //     const data = await this.http
  //       .get(`${this.reqUrl}/backend/subcategories/all`, this.headers_object)
  //       .toPromise();
  //     this.subCategories = data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async getCategories() {
  //   try {
  //     const data = await this.http
  //       .get(`${this.reqUrl}/backend/categories/all`, this.headers_object)
  //       .toPromise();
  //     this.categories = data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async getLibraryTypes() {
  //   try {
  //     const data = await this.http
  //       .get(`${this.reqUrl}/backend/library-types/all`, this.headers_object)
  //       .toPromise();
  //     this.libraryTypes = data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async updateLibrary() {
    const formData = this.libraryForm.getRawValue();
    try {
      const id = await this.http
        .patch(
          `${this.reqUrl}/backend/libraries/${this.libraryId}`,
          formData,
          this.headers_object
        )
        .toPromise();
      this.router.navigate(['home']);
    } catch (error) {
      console.log(error);
    }
  }
}
