import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { DataUserService } from '../service/data-user.service';
import { ListApiService } from '../list-api/list-api.service';

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
    private cookieService: CookieService,
    private dataUserService: DataUserService,
    private api: ListApiService
  ) { }

  ngOnInit() {
    this.dataUser = this.dataUserService.cekDataUser();
    this.currentPath = this._router;
    this.createCookiesPage(this.currentPath.url);
    if (this.dataUser == null) {
      this.api.getUserById(this.cookieService.get('cIdUser')).subscribe(data => {
        this.dataUser = data['data'][0];
      });
    }
  }

  logout() {
    this.cookieService.deleteAll();
    this.alertMessage('info', 'You\'re Logout!');
    this.router.navigate(['login']);
  }

  alertMessage(mtype: any, mtitle: any) {
    const toast = swal['mixin']({
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

  createCookiesPage(page: string) {
    if (this.cookieService.check('cCurrentPath')) {
      this.cookieService.delete('cCurrentPath');
      this.cookieService.set( 'cCurrentPath', page );
    } else {
      this.cookieService.set( 'cCurrentPath', page );
    }
  }

}
