import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { DataUserService } from '../service/data-user.service';
import { ListApiService } from '../service/list-api.service';
import { AlertPopupService } from '../service/alert-popup.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentPath: Router;
  dataUser: Object;

  constructor(
    private router: Router,
    private _router: Router,
    private dataUserService: DataUserService,
    private api: ListApiService,
    private alertPopup: AlertPopupService
  ) { }

  ngOnInit() {
    this.dataUser = this.dataUserService.cekDataUser();
    this.currentPath = this._router;
    localStorage.setItem('cCurrentPath', this.currentPath.url);
    if (this.dataUser == null) {
      this.api.getUserById(localStorage.getItem('cIdUser')).subscribe(data => {
        this.dataUser = data['data'][0];
      });
    }
  }

  logout() {
    localStorage.clear();
    this.alertPopup.alertMessage('info', 'You\'re Logout!');
    this.router.navigate(['login']);
  }

}
