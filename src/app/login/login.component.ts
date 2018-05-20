import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ListApiService } from '../list-api/list-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dataUser: Object;

  isDontHaveAccount: boolean;
  isHaveAccount: boolean;

  loginForm: FormGroup;

  loading: boolean;

  constructor(private listApiService: ListApiService, private router: Router) {
    this.isDontHaveAccount = false;
    this.isHaveAccount = true;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.listApiService.getUser().subscribe(data => {
      this.dataUser = data;
      console.log(this.dataUser);
    });
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
}
