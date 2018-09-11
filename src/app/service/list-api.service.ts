import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })
  };

@Injectable()
export class ListApiService {

    public API = 'http://localhost:69/api/nowplaying/';

    constructor(private http: HttpClient) { }

    getData(table: string): Observable<any> {
        let result: Observable<Object>;
            result = this.http.get(this.API + table + '/read');
        return result;
    }

    postData(table: string, data: Object): Observable<any> {
        let result: Observable<Object>;
            result = this.http.post(this.API + table + '/create', data);
        return result;
    }

    putData(table: string, data: Object): Observable<any> {
        let result: Observable<Object>;
            result = this.http.put(this.API + table + '/update', data);
        return result;
    }

    deleteData(table: string, id: string): Observable<any> {
        let result: Observable<Object>;
            result = this.http.delete(this.API + table + '/delete/' + id, httpOptions);
        return result;
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

