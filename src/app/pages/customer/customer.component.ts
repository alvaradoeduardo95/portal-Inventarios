import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AltaClienteModel } from '../../models/altaCliente.model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ClientesService } from '../../services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

// Servicio de SEPOMEX
import { InfoByCPService } from '../../services/infoByCP.service';

// Servicio catalogo de uso de CFDI
import { CatalogoCFDIService } from 'src/app/services/catalogoCFDI.service';
import { CatalogoCFDIInterface } from '../../services/catalogoCFDI.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [InfoByCPService, CatalogoCFDIService],
})
export class CustomerComponent implements OnInit {
  // Modelo para alta de usuario
  cliente = new AltaClienteModel();

  // Referencia al formulario
  formulario: FormGroup;

  // Arreglo para recepción de info asentamientos de API por código postal
  public asentamientos: any[];
  public asentamientosFact: any[];

  // Variables para recuperar valores de API por código postal
  // Contacto
  public municipio: string;
  public estado:    string;
  public pais:      string;
  public ciudad:    string;

  // Facturación
  public municipioFact: string;
  public estadoFact:    string;
  public paisFact:      string;
  public ciudadFact:    string;

  // Arreglo de catalogo de uso de CFDI
  public catalgoCFDI: CatalogoCFDIInterface[] = [];

  constructor( private formBuilder:         FormBuilder,
               private infoCPService:       InfoByCPService,
               private clientesService:     ClientesService,
               private catalogoCFDIService: CatalogoCFDIService,
               private route:               ActivatedRoute,
               private router:              Router ) {
    // Generar el formulario
    this.createForm();
    // Inicializar el array de asentamientos vacío
    this.asentamientos     = new Array();
    this.asentamientosFact = new Array();
    // Obtener información del cliente en caso de que se este editando
    this.getInfoCustomer();
  }

  ngOnInit() {
    // Obtener catalogo de uso de CFDI
    this.catalgoCFDI = this.catalogoCFDIService.getCatalogoCFDI();
  }
  
  // Obtener información de cliente (Solo aplica cuando es para editar)
  getInfoCustomer(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.clientesService
        .getCustomer(id)
        .subscribe((resp: AltaClienteModel) => {
          this.cliente = resp;
          this.cliente.id = id;
          // Enviar información del cliente al formulario
          this.setInfoCustomer( id );
        });
    }
  }

  // Validar si ya existe un ID
  checkCustomerID() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.formulario.patchValue({ id: id });
      this.cliente.id = id;
    }
  }

  // Validar si la propiedad es válida
  propertyNoVal(propiedad: string) {
    return (
      this.formulario.get(propiedad).invalid &&
      this.formulario.get(propiedad).touched
    );
  }

  // Creación y control de formulario
  createForm() {
    this.formulario = this.formBuilder.group({
      id:                     [''],
      // Datos de contacto
      nombre1:                ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      nombre2:                ['', [ Validators.maxLength(20) ]],
      apellido1:              ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      apellido2:              ['', [ Validators.maxLength(20) ]],
      telefono:               ['', [ Validators.required, Validators.minLength(10)]],
      correo:                 ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'), Validators.maxLength(50)]],
      // Datos de dirección del contacto
      calle:                  ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      numExt:                 ['', [ Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      numInt:                 [''],
      colonia:                ['', [ Validators.required ]],
      delMun:                 ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      cp:                     ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      estado:                 ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      pais:                   ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      entreCalle:             [''],
      yCalle:                 [''],
      // Datos de facturación
      persona:                [''],
      razonSocial:            [''],
      rfc:                    [''],
      usoCFDI:                [''],
      correoFact:             [''],
      dirCorreoIgualContacto: [''],
      // Datos de dirección de facturación (opcional)
      calleFact:              [''],
      numExtFact:             [''],
      numIntFact:             [''],
      coloniaFact:            [''],
      delMunFact:             [''],
      cpFact:                 [''],
      estadoFact:             [''],
      paisFact:               [''],
      entreCalleFact:         [''],
      yCalleFact:             [''],
      // Flag de bloqueo
      flag_bloqueo:           ['']
    });
    // Deshabilitar campos
    this.formulario.controls['id'].disable();
  }

  // Enviar información al formulario (Editar cliente)
  setInfoCustomer( idCustomer:string ) {
    this.formulario.setValue({
      id:                     idCustomer,
      nombre1:                this.cliente.nombre1,
      nombre2:                this.cliente.nombre2,
      apellido1:              this.cliente.apellido1,
      apellido2:              this.cliente.apellido2,
      telefono:               this.cliente.telefono,
      correo:                 this.cliente.correo,
      calle:                  this.cliente.calle,
      numExt:                 this.cliente.numExt,
      numInt:                 this.cliente.numInt,
      delMun:                 this.cliente.delMun,
      colonia:                this.cliente.colonia,
      cp:                     this.cliente.cp,
      estado:                 this.cliente.estado,
      pais:                   this.cliente.pais,
      entreCalle:             this.cliente.entreCalle,
      yCalle:                 this.cliente.yCalle,
      // Datos de facturación
      persona:                this.cliente.persona,
      razonSocial:            this.cliente.razonSocial,
      rfc:                    this.cliente.rfc,
      usoCFDI:                this.cliente.usoCFDI,
      correoFact:             this.cliente.correoFact,
      dirCorreoIgualContacto: this.cliente.dirCorreoIgualContacto,
      // Datos de dirección de facturación
      calleFact:              this.cliente.calleFact,
      numExtFact:             this.cliente.numExtFact,
      numIntFact:             this.cliente.numIntFact,
      coloniaFact:            this.cliente.coloniaFact,
      delMunFact:             this.cliente.delMunFact,
      cpFact:                 this.cliente.cpFact,
      estadoFact:             this.cliente.estadoFact,
      paisFact:               this.cliente.paisFact,
      entreCalleFact:         this.cliente.entreCalleFact,
      yCalleFact:             this.cliente.yCalleFact,
      // Flag de bloqueo
      flag_bloqueo:           this.cliente.flag_bloqueo
    });
  }

  // Obtener información de código postal para dirección de contacto
  getInfoCPDirContact(cp: string) {
    this.infoCPService.getInfo(cp).subscribe(
      (result) => {
        // Limpiar array de asentamientos
        this.asentamientos = [];

        // Armar array para asentamientos devueltos por API de CP
        for (var index in result) {
          for (var i in result[index].response) {
            this.asentamientos[index] = result[index].response.asentamiento;
          }
          
          this.estado     = result[index].response.estado;
          this.pais       = result[index].response.pais;
          this.ciudad     = result[index].response.ciudad;
          this.municipio  = result[index].response.municipio;
        }
        // Actualizar valores recuperados en el formulario
        this.formulario.patchValue({
          pais:   this.pais,
          estado: this.estado,
          ciudad: this.ciudad,
          delMun: this.municipio,
        });
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

    // Obtener información de código postal para dirección de contacto
    getInfoCPDirFact(cp: string) {
      this.infoCPService.getInfo(cp).subscribe(
        (result) => {
          // Limpiar array de asentamientos
          this.asentamientosFact = [];
  
          // Armar array para asentamientos devueltos por API de CP
          for (var index in result) {
            for (var i in result[index].response) {
              this.asentamientosFact[index] = result[index].response.asentamiento;
            }
            
            this.estadoFact     = result[index].response.estado;
            this.paisFact       = result[index].response.pais;
            this.ciudadFact     = result[index].response.ciudad;
            this.municipioFact  = result[index].response.municipio;
          }
          // Actualizar valores recuperados en el formulario
          this.formulario.patchValue({
            paisFact:   this.paisFact,
            estadoFact: this.estadoFact,
            ciudadFact: this.ciudadFact,
            delMunFact: this.municipioFact,
          });
        },
        (error) => {
          console.log(<any>error);
        }
      );
    }

  // Guardar datos
  save() {

    // Traspasar valores de formulario a modelo cliente
    this.cliente = this.formulario.value;
    // Validar si es ID existente o nuevo
    this.checkCustomerID();
    if (this.formulario.invalid) {
      Object.values(this.formulario.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      Swal.fire({
        position: 'center',
        icon:     'error',
        title:    'Faltan campos por llenar',
        text:     'Favor de llenar los campos obligatorios',
      });
      return;
      
    } else {
      // Observable para control de mensaje
      let peticion: Observable<any>;

      // Mensaje de información
      if (this.cliente.id) {
        // Actualizando
        Swal.fire({
          position:          'center',
          icon:              'info',
          title:             'Actualizando información',
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 2000,
        });
        // Si ya existe un ID en Firebase :. se actualiza
        peticion = this.clientesService.updateCustomer(this.cliente);
      } else {
        // Guardando
        Swal.fire({
          position: 'center',
          icon:     'info',
          title:    'Guardando información',
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        // De lo contrario es nuevo registro :. se crea
        peticion = this.clientesService.createCustomer(this.cliente);
      }

      Swal.showLoading();

      // Liberar pantalla
      peticion.subscribe((resp) => {
        Swal.fire({
          position: 'center',
          icon:     'success',
          title:     this.cliente.nombre1,
          text:      'Se actualizo correctamente',
        });
      });
    }
  }

  // Cancelar guardado
  cancelSave() {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Cancelar alta de cliente',
      text: '¿Desea cancelar?',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.router.navigateByUrl('/home');
      }
    } );
  }
}
