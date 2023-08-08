import { Component, OnInit, AfterContentInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  reqUrl: string = 'https://api.workflowdev.pluto-men.com';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({ email: '', password: '' });
  }
  submit(): void {
    let obj = {
      email: this.form.getRawValue().email,
      password: this.form.getRawValue().password,
      deviceType: 'web',
    };
    let pass = this.form.getRawValue().password;
    let email = this.form.getRawValue().email;
    if (pass == '' || pass == null || email == '' || email == null) {
      alert('Fields Can Not be Empty');
    } else {
      this.http.post(`${this.reqUrl}/backend/account/login`, obj).subscribe(
        (data) => {
          localStorage.setItem('token', JSON.stringify(data));
          console.log(data);
          this.router.navigate(['/home']);
        },
        (err) => {
          if (err.status == 404) {
            alert('User Not Found With This mail');
          } else if (err.status == 403) {
            alert('Invalid Password');
          } else {
            alert('Invalid Credentials');
          }
        }
      );
    }
  }
}
