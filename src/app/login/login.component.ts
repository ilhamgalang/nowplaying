import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { CookieService } from 'ngx-cookie-service';
import { ListApiService } from '../service/list-api.service';
import { DataUserService } from '../service/data-user.service';
import { AlertPopupService } from '../service/alert-popup.service';

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

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder,
    private dataUserService: DataUserService,
    private api: ListApiService,
    private alertPopup: AlertPopupService
  ) { }

  ngOnInit() {
    this.isDontHaveAccount = false;
    this.isHaveAccount = true;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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
    this.api.getCekLogin(this.loginForm.value).subscribe(data => {
      this.dataUser = data;
      if (this.dataUser['status'] === 1) {
        this.cookieService.set('cIdUser', this.dataUser['data'][0]['id_user']);
        this.dataUserService.setDataUser(this.dataUser['data'][0]);
        this.router.navigate(['home']);
      } else {
        this.loginForm.reset();
        this.alertMessage('error', 'Wrong Username Or Password');
      }
    });
  }

  register() {
    this.api.postUser(this.registerForm.value).subscribe(data => {
      this.dataUser = data;
      console.log(this.dataUser);
      if (this.dataUser['status'] === 1) {
        this.getId(this.registerForm.value);
      } else {
        this.alertMessage('error', this.dataUser['message']);
      }
    });
  }

  getId(dataRegister: Object) {
    this.api.getCekLogin(dataRegister).subscribe(data => {
      this.dataUser = data;
      this.cookieService.set('cIdUser', this.dataUser['data'][0]['id_user']);
      this.dataUserService.setDataUser(this.dataUser['data'][0]);
      this.alertMessage('success', this.dataUser['message']);
      this.router.navigate(['home']);
    });
  }

  buttonBackRegister() {
    this.isDontHaveAccount = false;
    this.isHaveAccount = true;
  }

  buttonRegister() {
    this.isDontHaveAccount = true;
    this.isHaveAccount = false;
  }

  alertMessage(mtype: any, mtitle: any) {
    this.alertPopup.alertMessage(mtype, mtitle);
  }

  alertMessageNull(mtype: any, mtitle: any) {
    this.alertPopup.alertMessageNull(mtype, mtitle);
  }


}
