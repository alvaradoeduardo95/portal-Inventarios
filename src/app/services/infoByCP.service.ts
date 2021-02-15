import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class InfoByCPService {

    public url: string;

    constructor(
        public _http: HttpClient
    ){
       this.url = "https://api-sepomex.hckdrk.mx/query/info_cp/";       
    }

    getInfo(cp: string): Observable<any>{
        return this._http.get(this.url + cp);
    }
}