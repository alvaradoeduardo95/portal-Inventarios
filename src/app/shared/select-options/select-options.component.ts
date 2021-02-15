import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

// Servicio para valores de SO e interface
import {
  SOValueService,
  ValuesSOInterface,
} from '../../services/selectOptionsValues.service';

@Component({
  selector: 'app-select-options',
  templateUrl: './select-options.component.html',
})
export class SelectOptionsComponent implements OnInit {
  // Referencia al formulario
  form: FormGroup;
  incValIndArraySO: FormArray;
  incValRanArraySO: FormArray;
  excValIndArraySO: FormArray;
  excValRanArraySO: FormArray;

  // Referencia al formulario temporal para guardado de parámetros
  formTemp: FormGroup;
  incValIndArraySOTemp: FormArray;
  incValRanArraySOTemp: FormArray;
  excValIndArraySOTemp: FormArray;
  excValRanArraySOTemp: FormArray;

  // Valores para select options
  public ValuesForInd: ValuesSOInterface[] = [];
  public ValuesForRange: ValuesSOInterface[] = [];

  // Variables para control de mostrar/ocultar tablas de acuerdo a botón seleccionado
  public showTableIncInd: boolean = true; // Tabla para incluir valores individuales
  public showTableIncRan: boolean = false; // Tabla para incluir rangos
  public showTableExcInd: boolean = false; // Tabla para excluir valores individuales
  public showTableExcRan: boolean = false; // Tabla para excluir intervalos

  constructor(
    private formBuilder: FormBuilder,
    private _serviceValuesForSO: SOValueService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    // Obtener los valores configurados para select options
    this.ValuesForInd = this._serviceValuesForSO.getValuesForInd();
    this.ValuesForRange = this._serviceValuesForSO.getValuesForRange();

    // Inicializar formulario
    this.form = this.formBuilder.group({
      incValInd: this.formBuilder.array([this.createFormArraySO('A')]),
      incValRan: this.formBuilder.array([this.createFormArraySO('B')]),
      excValInd: this.formBuilder.array([this.createFormArraySO('C')]),
      excValRan: this.formBuilder.array([this.createFormArraySO('D')]),
    });

    // Enviar parámetros de select options al form control que contendrá los parámetros
    this.incValIndArraySO = this.form.get('incValInd') as FormArray;
    this.incValRanArraySO = this.form.get('incValRan') as FormArray;
    this.excValIndArraySO = this.form.get('excValInd') as FormArray;
    this.excValRanArraySO = this.form.get('excValRan') as FormArray;

    // Obtener valores de búsqueda pre-llenados por el usuario
    this.getParamsInLocalStorageAndSetToForm();

    // Inicializar formulario temporal
    this.formTemp = this.formBuilder.group({
      incValIndTemp: this.formBuilder.array([this.createFormArraySO('A')]),
      incValRanTemp: this.formBuilder.array([this.createFormArraySO('B')]),
      excValIndTemp: this.formBuilder.array([this.createFormArraySO('C')]),
      excValRanTemp: this.formBuilder.array([this.createFormArraySO('D')]),
    });

    // Enviar parámetros de select options al form control temporal que contendrá los parámetros que ingreso el usuario
    this.incValIndArraySOTemp = this.formTemp.get('incValIndTemp') as FormArray;
    this.incValRanArraySOTemp = this.formTemp.get('incValRanTemp') as FormArray;
    this.excValIndArraySOTemp = this.formTemp.get('excValIndTemp') as FormArray;
    this.excValRanArraySOTemp = this.formTemp.get('excValRanTemp') as FormArray;
  }

  // Crear el formulario
  createFormArraySO(caseArr: string): FormGroup {
    if (caseArr === 'A') {
      // Agregar fila a tabla de incluir valores individuales
      return this.formBuilder.group({
        sign: ['I'],
        option: ['='],
        low: [''],
        high: [''],
      });
    } else if (caseArr === 'B') {
      // Agregar fila a tabla de incluir rangos
      return this.formBuilder.group({
        sign: ['I'],
        option: ['[ ]'],
        low: [''],
        high: [''],
      });
    } else if (caseArr === 'C') {
      // Agregar fila a tabla de excluir valores individuales
      return this.formBuilder.group({
        sign: ['E'],
        option: ['='],
        low: [''],
        high: [''],
      });
    } else if (caseArr === 'D') {
      // Agregar fila a tabla de excluir rangos
      return this.formBuilder.group({
        sign: ['E'],
        option: ['[ ]'],
        low: [''],
        high: [''],
      });
    }
  }

  // Agregar nueva fila(parámetro de búsqueda)
  addNewRow(caseArr: string) {
    // Variable contador
    let cont: number = 0;

    // Número de registros a agregar cuando se de click en + Agregar
    const nRow: number = 1;

    if (caseArr === 'A') {
      // Agregar fila a tabla de incluir valores individuales
      do {
        this.incValIndArraySO.push(this.createFormArraySO('A'));
        cont++;
      } while (cont < nRow);
    } else if (caseArr === 'B') {
      // Agregar fila a tabla de incluir rangos
      do {
        this.incValRanArraySO.push(this.createFormArraySO('B'));
        cont++;
      } while (cont < nRow);
    } else if (caseArr === 'C') {
      // Agregar fila a tabla de excluir valores individuales
      do {
        this.excValIndArraySO.push(this.createFormArraySO('C'));
        cont++;
      } while (cont < nRow);
    } else if (caseArr === 'D') {
      // Agregar fila a tabla de excluir rangos
      do {
        this.excValRanArraySO.push(this.createFormArraySO('D'));
        cont++;
      } while (cont < nRow);
    }
  }

  // Remover fila(parámetro de búsqueda)
  deleteRow(param: string, index: number) {
    if (param === 'A') {
      // Remover fila por índice a tabla de incluir valores individuales
      this.incValIndArraySO.removeAt(index);
    } else if (param === 'B') {
      // Remover fila por índice a tabla de incluir rangos
      this.incValRanArraySO.removeAt(index);
    } else if (param === 'C') {
      // Remover fila por índice a tabla de excluir valores individuales
      this.excValIndArraySO.removeAt(index);
    } else if (param === 'D') {
      // Remover fila por índice a tabla de excluir rangos
      this.excValRanArraySO.removeAt(index);
    }
  }

  // Mostrar/ocultar tablas de acuerdo a boton seleccionado
  // Mostrar tabla para incluir valores individuales
  showIncInd() {
    this.showTableIncInd = true;
    this.showTableIncRan = false;
    this.showTableExcInd = false;
    this.showTableExcRan = false;
  }

  // Mostrar tabla para incluir rangos
  showIncRan() {
    this.showTableIncInd = false;
    this.showTableIncRan = true;
    this.showTableExcInd = false;
    this.showTableExcRan = false;
  }

  // Mostrar tabla para excluir valores individuales
  showExcInd() {
    this.showTableIncInd = false;
    this.showTableIncRan = false;
    this.showTableExcInd = true;
    this.showTableExcRan = false;
  }

  // Mostrar tabla para excluir rangos
  showExcRan() {
    this.showTableIncInd = false;
    this.showTableIncRan = false;
    this.showTableExcInd = false;
    this.showTableExcRan = true;
  }

  getParamsInRoute(): string {
    // 'A' el usuario ingreso solo un valor | 'B' el usuario ingreso un rango

    // Variables para guardar parámetros enviados
    let paramLow: string;
    let paramHigh: string;

    // Variable para validar si es inserción o se mantuvo el mismo valor
    let paramName: string = this.activatedRoute.snapshot.paramMap.get('param');
    let params: any = JSON.parse(localStorage.getItem(`${paramName}`));

    // Obtener parámetro low
    paramLow = this.activatedRoute.snapshot.paramMap.get('low');

    // Obtener parámetro high
    paramHigh = this.activatedRoute.snapshot.paramMap.get('high');

    if (
      paramLow != '' &&
      paramLow != null &&
      paramHigh != '' &&
      paramHigh != null
    ) {
      // Validar si se debe agregar o no el nuevo valor
      if (params != null && params.incValRanTemp.length > 0) {
        if (
          params.incValRanTemp[0].low != paramLow ||
          params.incValRanTemp[0].high != paramHigh
        ) {
          // Setear valor en rango
          this.incValRanArraySO.push(
            this.formBuilder.group({
              sign: ['I'],
              option: ['[ ]'],
              low: [paramLow],
              high: [paramHigh],
            })
          );
          return 'B';
        }
      } else if (params == null) {
        // Setear valor en rango
        this.incValRanArraySO.push(
          this.formBuilder.group({
            sign: ['I'],
            option: ['[ ]'],
            low: [paramLow],
            high: [paramHigh],
          })
        );
        return 'B';
      }
    } else if (
      (paramLow != "" && paramLow != null) &&
      (paramHigh == "" || paramHigh == null)
    ) {
      if (params != null && params.incValIndTemp.length > 0) {
        if (params.incValIndTemp[0].low != paramLow) {
          // Setear valor individual
          this.incValIndArraySO.push(
            this.formBuilder.group({
              sign: ['I'],
              option: ['='],
              low: [paramLow],
              high: [''],
            })
          );
          return 'A';
        }
      } else if (params == null) {
        // Setear valor individual
        this.incValIndArraySO.push(
          this.formBuilder.group({
            sign: ['I'],
            option: ['='],
            low: [paramLow],
            high: [''],
          })
        );
        return 'A';
      }
    } else if (
      (paramLow == '' || paramLow == null) &&
      (paramHigh == '' || paramHigh == null)
    ) {
      return;
    }
  }

  // Recuperar parámetros y setearlos en el formulario del SO
  getParamsInLocalStorageAndSetToForm() {
    // Flags para validar si se insertaron parámetros de local storage
    // entonces se borra el primer registro insertado cuando se inicializo el componente
    let flagA: string;
    let flagB: string;
    let flagC: string;
    let flagD: string;

    // Variable para guardar el nombre del parámetro de dónde se mando llamar el componente SO
    let paramName: string;

    // Retorno de método para saber que array del SO fue ingresado por el usuario
    let flagParamsEnvi: string;

    // Obtener parámetros de ruta y setearlos en su lugar correspondiente
    flagParamsEnvi = this.getParamsInRoute();
    // flagParamsEnvi = 'A' el usuario ingreso solo un valor | flagParamsEnvi = 'B' el usuario ingreso un rango
    if (flagParamsEnvi == 'A') {
      flagA = 'X';
    } else if (flagParamsEnvi == 'B') {
      flagB = 'X';
    }

    // Obtener parámetro de ruta
    paramName = this.activatedRoute.snapshot.paramMap.get('param');

    // Obtener parámetros guardados en local storage
    let collectionArray: any = JSON.parse(localStorage.getItem(`${paramName}`));

    // Generar los input's para los parámetros ingresados previamente por el usuario
    // y precargar la información en los campos
    if (collectionArray !== null) {
      // Incluir valores individuales
      for (let val of collectionArray.incValIndTemp) {
        if (val.low != null || val.low != '') {
          this.incValIndArraySO.push(
            this.formBuilder.group({
              sign: ['I'],
              option: [val.option],
              low: [val.low],
              high: [''],
            })
          );
          // Prender flag
          flagA = 'X';
        }
      }

      // Incluir rangos
      for (let val of collectionArray.incValRanTemp) {
        if (
          (val.low != null || val.low != '') &&
          (val.high != null || val.high != '')
        ) {
          this.incValRanArraySO.push(
            this.formBuilder.group({
              sign: ['I'],
              option: [val.option],
              low: [val.low],
              high: [val.high],
            })
          );
          // Prender flag
          flagB = 'X';
        }
      }

      // Excluir valores individuales
      for (let val of collectionArray.excValIndTemp) {
        if (val.low != null || val.low != '') {
          this.excValIndArraySO.push(
            this.formBuilder.group({
              sign: ['E'],
              option: [val.option],
              low: [val.low],
              high: [''],
            })
          );
          // Prender flag
          flagC = 'X';
        }
      }

      // Excluir rangos
      for (let val of collectionArray.excValRanTemp) {
        if (
          (val.low != null || val.low != '') &&
          (val.high != null || val.high != '')
        ) {
          this.excValRanArraySO.push(
            this.formBuilder.group({
              sign: ['E'],
              option: [val.option],
              low: [val.low],
              high: [val.high],
            })
          );
          // Prender flag
          flagD = 'X';
        }
      }
    }

    // Borrar primeros registros del formulario e insertar uno nuevo
    if (flagA === 'X') {
      this.deleteRow('A', 0);
      this.incValIndArraySO.push(this.createFormArraySO('A'));
    }
    if (flagB === 'X') {
      this.deleteRow('B', 0);
      this.incValRanArraySO.push(this.createFormArraySO('B'));
    }
    if (flagC === 'X') {
      this.deleteRow('C', 0);
      this.excValIndArraySO.push(this.createFormArraySO('C'));
    }
    if (flagD === 'X') {
      this.deleteRow('D', 0);
      this.excValRanArraySO.push(this.createFormArraySO('D'));
    }
  }

  // Guardar parámetros
  saveParams() {
    // Remover primer registro generado en el ngOnInit al formulario temporal dónde se guardará solo los parámetros ingresados
    this.incValIndArraySOTemp.removeAt(0);
    this.incValRanArraySOTemp.removeAt(0);
    this.excValIndArraySOTemp.removeAt(0);
    this.excValRanArraySOTemp.removeAt(0);

    // Variable para guardar el nombre del parámetro de dónde se mando llamar el componente SO
    let getParamInRoute: string;

    // Obtener parámetro de ruta
    getParamInRoute = this.activatedRoute.snapshot.paramMap.get('param');

    // Quitar parámetros vacíos antes de guardar en local storage

    // Variable para obtener la longitud del array a extraer parámetros
    let lenghtArray: number = this.incValIndArraySO.length - 1;

    // Obtener parámetros ingresados en incluir valores individuales
    for (var counter: number = 0; counter <= lenghtArray; counter++) {
      if (this.incValIndArraySO.value[counter].low != '') {
        this.incValIndArraySOTemp.push(
          this.formBuilder.group({
            sign: ['I'],
            option: [this.incValIndArraySO.value[counter].option],
            low: [this.incValIndArraySO.value[counter].low],
            high: [''],
          })
        );
      }
    }

    // Obtener parámetros ingresados en incluir rangos
    lenghtArray = this.incValRanArraySO.length - 1;
    for (var counter: number = 0; counter <= lenghtArray; counter++) {
      if (this.incValRanArraySO.value[counter].low != '') {
        this.incValRanArraySOTemp.push(
          this.formBuilder.group({
            sign: ['I'],
            option: [this.incValRanArraySO.value[counter].option],
            low: [this.incValRanArraySO.value[counter].low],
            high: [this.incValRanArraySO.value[counter].high],
          })
        );
      }
    }

    // Obtener parámetros ingresados en excluir valores individuales
    lenghtArray = this.excValRanArraySO.length - 1;
    for (var counter: number = 0; counter <= lenghtArray; counter++) {
      if (this.excValIndArraySO.value[counter].low != '') {
        this.excValIndArraySOTemp.push(
          this.formBuilder.group({
            sign: ['E'],
            option: [this.excValIndArraySO.value[counter].option],
            low: [this.excValIndArraySO.value[counter].low],
            high: [''],
          })
        );
      }
    }

    // Obtener parámetros ingresados en excluir rangos
    lenghtArray = this.excValRanArraySO.length - 1;
    for (var counter: number = 0; counter <= lenghtArray; counter++) {
      if (this.excValRanArraySO.value[counter].low != '') {
        this.excValRanArraySOTemp.push(
          this.formBuilder.group({
            sign: ['E'],
            option: [this.excValRanArraySO.value[counter].option],
            low: [this.excValRanArraySO.value[counter].low],
            high: [this.excValRanArraySO.value[counter].high],
          })
        );
      }
    }

    // Guardar en local storage la info ingresada por el usuario con el nombre del parámetro
    localStorage.setItem(
      `${getParamInRoute}`,
      JSON.stringify(this.formTemp.value)
    );

    // Parámetros guardados
    Swal.fire('Parámetros guardados', '', 'info');

    // Ir atrás
    this.location.back();
  }

  // Limpiar parámetros
  clearParams() {
    // Variable para guardar el nombre del parámetro de dónde se mando llamar el componente SO
    let getParamInRoute: string;

    // Obtener parámetro de ruta
    getParamInRoute = this.activatedRoute.snapshot.paramMap.get('param');

    // Quitar de local storage los parámetros guardados
    localStorage.removeItem(`${getParamInRoute}`);
  }

  // Cancelar y volver a pantalla anterior
  back() {
    // Actualizando
    Swal.fire({
      title: 'Considerar los parámetros ingresados en la búsqueda',
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: `Cancelar`,
      confirmButtonText: `Guardar`,
      denyButtonText: `No guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Guardar en local storage los parámetros
        this.saveParams();
        // Ir atrás
        this.location.back();
      } else if (result.isDenied) {
        Swal.fire(
          'Parámetros no guardados',
          'Aquellos parámetros que no hayan sido guardados se han descartado...',
          'info'
        );
        // Ir atrás
        this.location.back();
      }
    });
  }
}