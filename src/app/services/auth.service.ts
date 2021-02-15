import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL para login en Firebase
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyC2-r3ObcadB4QYuDmF2a-QVcKAQglfCCc';

  // Token
  userToken: string;

  constructor( private http: HttpClient ) {
    this.readToken();
   }

  // Leer token
  readToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }
  // Cerrar sesión
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    window.location.reload();
  }

  // Iniciar sesión
  login( user: UserModel ){
    const AUTHDATA = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/accounts:signInWithPassword?key=${ this.apiKey }`,
      AUTHDATA
    ).pipe(
      map(
        resp => {
          this.saveToken(resp['idToken']);
          window.location.reload();
          return resp;
        }
      )
    );
  }

  // Guardar token
  private saveToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );


  }

  // Validar si existe una sesión activa
  isAuth(){
    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }
  }
}