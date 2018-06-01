import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ListApiService } from './list-api.service';

@Injectable()
export class DataUserService {

    dataUser: Object;

    constructor(
        private api: ListApiService,
        private cookieService: CookieService
    ) { }

    setDataUser(data: Object) {
        this.dataUser = data;
    }

    cekDataUser() {
        if (this.dataUser == null) {
          this.api.getUserById(this.cookieService.get('cIdUser')).subscribe(data => {
            this.dataUser = data['data'][0];
            this.setDataUser(this.dataUser);
          });
        } else {
            this.setDataUser(this.dataUser);
        }
        return this.dataUser;
    }

    getDataUser() {
        return this.dataUser;
    }
}
