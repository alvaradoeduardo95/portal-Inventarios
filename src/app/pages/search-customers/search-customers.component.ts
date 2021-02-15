import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectOptionModel } from '../../models/selectOptions.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styles: [],
})
export class SearchCustomersComponent implements OnInit {
  // Referencia al formulario
  formulario: FormGroup;

  // Arrays para guardado de parámetros de búsqueda
  idParams = new SelectOptionModel();

  // Identificadores de parámetros enviados al Select-Options en la ruta
  id: string = 'idCliente'; // A
  razonSocial: string = 'razonSocial'; // B
  rfc: string = 'rfc'; // C
  nombre1: string = 'nombre1'; // D
  nombre2: string = 'nombre2'; // E
  apellidoP: string = 'app'; // F
  apellidoM: string = 'apm'; // G
  telefono: string = 'telefono'; // H
  correo: string = 'correo'; // I

  constructor(private formBuilder: FormBuilder,
              private route: Router, 
              private activatedRoute: ActivatedRoute) {
                // Generar el formulario
    this.createForm();
              }

  ngOnInit() {
    // Obtener valores ingresados en select options
    this.setInfoParamsToFormFromLocalStorage(this.id);
    this.setInfoParamsToFormFromLocalStorage(this.razonSocial);
    this.setInfoParamsToFormFromLocalStorage(this.rfc);
    this.setInfoParamsToFormFromLocalStorage(this.nombre1);
    this.setInfoParamsToFormFromLocalStorage(this.nombre2);
    this.setInfoParamsToFormFromLocalStorage(this.apellidoP);
    this.setInfoParamsToFormFromLocalStorage(this.apellidoM);
    this.setInfoParamsToFormFromLocalStorage(this.telefono);
    this.setInfoParamsToFormFromLocalStorage(this.correo);
  }

  // Crear el formulario
  createForm(){
    this.formulario = this.formBuilder.group({
      // Id de cliente
      idLow: [''],
      idHigh: [''],
      // Razón social de cliente
      razonSocialLow: [''],
      razonSocialHigh: [''],
      // RFC de cliente
      rfcLow: [''],
      rfcHigh: [''],
      // Nombre de cliente
      nombre1Low: [''],
      nombre1High: [''],
      // Nombre 2 de cliente
      nombre2Low: [''],
      nombre2High: [''],
      // Apellido paterno del cliente
      appLow: [''],
      appHigh: [''],
      // Apellido materno del cliente
      apmLow: [''],
      apmHigh: [''],
      // Telefono de cliente
      telefonoLow: [''],
      telefonoHigh: [''],
      // Correo de cliente
      correoLow: [''],
      correoHigh: [''],
      // Tipo de persona
      persona: [''],
    });
  }

  // Mandar llamar al componente del Select Options
  showSO(nameParam: string, valueLow: string, valueHigh: string) {
    if (valueLow == '' && valueHigh != '') {
      Swal.fire({
        title: 'Error en el rango ingresado',
        icon: 'warning',
        text: 'Debe ingresar un rango que sea válido.',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: `Volver`,
      });
      return;
    } else if (valueLow != '' && valueHigh == '') {
      this.route.navigate([`/selectOptions/${nameParam}/${valueLow}`]);
    } else if (valueLow != '' && valueHigh != '') {
      this.route.navigate([
        `/selectOptions/${nameParam}/${valueLow}/${valueHigh}`,
      ]);
    } else if (valueLow == '' && valueHigh == '') {
      this.route.navigate([`/selectOptions/${nameParam}`]);
    }
  }

  // Setear información visual de valores ingresados en Select Options
  setInfoParamsToFormFromLocalStorage(paramName: string) {
    // Obtener array correspondiente
    let params: any = JSON.parse(localStorage.getItem(`${paramName}`));

    if(params == null ){
      return;
    }
    
    switch (paramName) {
      case this.id:
        if(params.incValRanTemp.length > 0){
          this.formulario.patchValue({
            idLow: params.incValRanTemp[0].low,
            idHigh: params.incValRanTemp[0].high
          });
        } else if(params.incValIndTemp.length > 0) {
          this.formulario.patchValue({
            idLow: params.incValIndTemp[0].low
          });
        }
        break;
      case this.razonSocial:
        if(params.incValRanTemp.length > 0){
          this.formulario.patchValue({
            razonSocialLow: params.incValRanTemp[0].low,
            razonSocialHigh: params.incValRanTemp[0].high
          });
        } else if(params.incValIndTemp.length > 0) {
          this.formulario.patchValue({
            razonSocialLow: params.incValIndTemp[0].low
          });
        }
        break;
      case this.rfc:
        if(params.incValRanTemp.length > 0){
          this.formulario.patchValue({
            rfcLow: params.incValRanTemp[0].low,
            rfcHigh: params.incValRanTemp[0].high
          });
        } else if(params.incValIndTemp.length > 0) {
          this.formulario.patchValue({
            rfcLow: params.incValIndTemp[0].low
          });
        }
        break;
      case this.nombre1:
        if(params.incValRanTemp.length > 0){
          this.formulario.patchValue({
            nombre1Low: params.incValRanTemp[0].low,
            nombre1High: params.incValRanTemp[0].high
          });
        } else if(params.incValIndTemp.length > 0) {
          this.formulario.patchValue({
            nombre1Low: params.incValIndTemp[0].low
          });
        }
        break;
      case this.nombre2:
        if(params.incValRanTemp.length > 0){
          this.formulario.patchValue({
            nombre2Low: params.incValRanTemp[0].low,
            nombre2High: params.incValRanTemp[0].high
          });
        } else if(params.incValIndTemp.length > 0) {
          this.formulario.patchValue({
            nombre2Low: params.incValIndTemp[0].low
          });
        }
        break;
      case this.apellidoP:
        if(params.incValRanTemp.length > 0){
          this.formulario.patchValue({
            appLow: params.incValRanTemp[0].low,
            appHigh: params.incValRanTemp[0].high
          });
        } else if(params.incValIndTemp.length > 0) {
          this.formulario.patchValue({
            appLow: params.incValIndTemp[0].low
          });
        }
        break;
      case this.apellidoM:
        if(params.incValRanTemp.length > 0){
          this.formulario.patchValue({
            apmLow: params.incValRanTemp[0].low,
            apmHigh: params.incValRanTemp[0].high
          });
        } else if(params.incValIndTemp.length > 0) {
          this.formulario.patchValue({
            apmLow: params.incValIndTemp[0].low
          });
        }
        break;
      case this.telefono:
        if(params.incValRanTemp.length > 0){
          this.formulario.patchValue({
            telefonoLow: params.incValRanTemp[0].low,
            telefonoHigh: params.incValRanTemp[0].high
          });
        } else if(params.incValIndTemp.length > 0) {
          this.formulario.patchValue({
            rfcLow: params.incValIndTemp[0].low
          });
        }
        break;
      case this.correo:
        if(params.incValRanTemp.length > 0){
          this.formulario.patchValue({
            correoLow: params.incValRanTemp[0].low,
            correoHigh: params.incValRanTemp[0].high
          });
        } else if(params.incValIndTemp.length > 0) {
          this.formulario.patchValue({
            correoLow: params.incValIndTemp[0].low
          });
        }
        break;
    }
  }

  search(){
    console.log(this.formulario.value);
  }
  deleteParam(param:string) {
    localStorage.removeItem(`${param}`);
  }
  clearParams(){
    this.deleteParam(this.id);
    this.deleteParam(this.razonSocial);
    this.deleteParam(this.rfc);
    this.deleteParam(this.nombre1);
    this.deleteParam(this.nombre2);
    this.deleteParam(this.apellidoP);
    this.deleteParam(this.apellidoM);
    this.deleteParam(this.telefono);
    this.deleteParam(this.correo);
    this.formulario.patchValue({
      // Id de cliente
      idLow: '',
      idHigh: '',
      // Razón social de cliente
      razonSocialLow: '',
      razonSocialHigh: '',
      // RFC de cliente
      rfcLow: '',
      rfcHigh: '',
      // Nombre de cliente
      nombre1Low: '',
      nombre1High: '',
      // Nombre 2 de cliente
      nombre2Low: '',
      nombre2High: '',
      // Apellido paterno del cliente
      appLow: '',
      appHigh: '',
      // Apellido materno del cliente
      apmLow: '',
      apmHigh: '',
      // Telefono de cliente
      telefonoLow: '',
      telefonoHigh: '',
      // Correo de cliente
      correoLow: '',
      correoHigh: '',
      // Tipo de persona
      persona: '',
    });
  }
}