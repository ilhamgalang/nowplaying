import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ListApiService {

    public API = 'http://localhost:69/api/nowplaying/';

    constructor(private http: HttpClient) { }

    getUser(): Observable<any> {
        return this.http.get(this.API + 'user/read');
    }

    getUserById(id: string): Observable<any> {
        let result: Observable<Object>;
            result = this.http.get(this.API + 'user/read?id_user=' + id);
        return result;
    }

    getCekLogin(data: Object): Observable<any> {
        let result: Observable<Object>;
            result = this.http.post(this.API + 'user/cekLogin', data);
        return result;
    }

    postUser(data: Object): Observable<any> {
        let result: Observable<Object>;
            result = this.http.post(this.API + 'user/create', data);
        return result;
    }

}

