import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Booleano para validar si se está logueado o no
  isLoggedIn: boolean;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isAuth();
  }

  logout(){
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Cerrar sesión',
      text: '¿Desea cerrar sesión?',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.auth.logout();
        this.router.navigateByUrl('/login');
      }
    } );
  }
}