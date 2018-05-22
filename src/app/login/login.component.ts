import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListApiService } from '../list-api/list-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  msg: any;
  dataUser: Object;

  isDontHaveAccount: boolean;
  isHaveAccount: boolean;

  loginForm: FormGroup;
  registerForm: FormGroup;

  loading: boolean;

  constructor(
    private listApiService: ListApiService,
    private router: Router,
    private fb: FormBuilder) {
      this.isDontHaveAccount = false;
      this.isHaveAccount = true;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      nama_user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  loginAsGuest() {
    this.loginForm.value.username = 'guest';
    this.loginForm.value.password = '';
    this.cekLogin();
    this.alertMessage('info', 'You\'re Login As Guest!');
  }

  cekLogin() {
    this.startLoading();
    this.listApiService.getCekLogin(this.loginForm.value).subscribe(data => {
      this.dataUser = data;
      console.log(this.dataUser['status']);
      if (this.dataUser['status'] === 1) {
        this.router.navigate(['home']);
      } else {
        this.loginForm.reset();
        this.alertMessage('error', 'Wrong Username Or Password');
      }
    });
    this.endLoading();
  }

  register() {
    this.startLoading();
    this.listApiService.postUser(this.registerForm.value).subscribe(data => {
      this.dataUser = data;
      console.log(this.dataUser);
      if (this.dataUser['status'] === 1) {
        this.alertMessage('success', this.dataUser['message']);
        this.router.navigate(['home']);
      } else {
        this.alertMessage('error', this.dataUser['message']);
      }
    });
    this.endLoading();
  }

  buttonBackRegister() {
    this.isDontHaveAccount = false;
    this.isHaveAccount = true;
  }

  buttonRegister() {
    this.isDontHaveAccount = true;
    this.isHaveAccount = false;
  }

  startLoading() {
    this.loading = true;
  }

  endLoading() {
    this.loading = false;
  }

  alertMessage(mtype: any, mtitle: any) {
    const toast = swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
    toast({
      type: mtype,
      title: mtitle
    });
  }
}
