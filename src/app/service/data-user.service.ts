import { Injectable } from '@angular/core';
import { ListApiService } from './list-api.service';

@Injectable()
export class DataUserService {

    dataUser: Object;

    constructor(
        private api: ListApiService
    ) { }

    setDataUser(data: Object) {
        this.dataUser = data;
    }

    cekDataUser() {
        if (this.dataUser == null) {
          this.api.getUserById(localStorage.getItem('cIdUser')).subscribe(data => {
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
