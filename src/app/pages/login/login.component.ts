import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent implements OnInit {
  
  // Variable para validar si ya existe un token
  isAuthNow: boolean;

  // Modelo de usuario
  user: UserModel = new UserModel();

  constructor( private auth: AuthService,
              private router: Router ) { }

  ngOnInit() {
    this.isAuthNow = this.auth.isAuth();
    if ( this.isAuthNow ){
      this.router.navigateByUrl('/home');
    }
  }

  // Login
  login( form: NgForm ){

    if ( form.invalid ) { return; }
    // Mostrar pop up de cargando
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Validando credenciales',
      text: 'Espere por favor...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    // Enviar credenciales
    this.auth.login( this.user )
    .subscribe(
      resp => {
        // Cerrar pop up
        Swal.close();
        // Redirigir a home
        this.router.navigateByUrl('/home');
      }, (err) => {
        Swal.close();
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      }
     );
  }

}
