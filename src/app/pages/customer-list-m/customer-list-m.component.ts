import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, DoCheck,ViewChild,} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

// Angular material
import { MatTableDataSource } from '@angular/material/table';

// Servicios
import { AuthService } from '../../services/auth.service';
import { ClientesService } from '../../services/clientes.service';
import { AltaClienteModel } from '../../models/altaCliente.model';

// Alertas
import Swal from 'sweetalert2';

// Imports Wijmo
import '@grapecity/wijmo.styles/wijmo.css';
import * as wijmo from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';
import * as grid from '@grapecity/wijmo.grid';
import * as grid2 from '@grapecity/wijmo.grid';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as pdf from '@grapecity/wijmo.pdf';
import { Selector } from '@grapecity/wijmo.grid.selector';
import { FlexGrid, HeadersVisibility } from '@grapecity/wijmo.grid';
import { CellMaker } from '@grapecity/wijmo.grid.cellmaker';
import { WjGridSearchModule } from '@grapecity/wijmo.angular2.grid.search';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import * as wjcXlsx from '@grapecity/wijmo.xlsx';


/**
 * @title Table with selection
 */
@Component({
  selector: 'app-customer-list-m',
  templateUrl: './customer-list-m.component.html',
  styleUrls: ['./customer-list-m.component.css'],
})
export class CustomerListMComponent implements OnInit, DoCheck {
  
  // references FlexGrid named 'flex' in the view
  @ViewChild('thePopup', { static: true }) thePopup: input.Popup;
  @ViewChild('theGrid', { static: true }) flex: wjcGrid.FlexGrid;
  data: any[];
  selectedItems: any[] = [];
  selector: Selector = null;
  headers = true;
  
  
  // MATERIAL ANGULAR
  // Arreglo
  clientes: AltaClienteModel[] = [];
  cargando = false;
  dataSource = new MatTableDataSource<AltaClienteModel>();

  constructor(
    private clientesService: ClientesService,
    private auth: AuthService,
    private router: Router,
    private _location : Location,
    //SERVICIO PARA WIJMO
    private dataService: ClientesService,
    
  ){
    //RETORNAR TODA LA DATA CON WIJMO
    this.data = this.getData();   
  }

  /*REPORTE EN EXCEL*/
 /* saveExpenses() {
    let workbook = this._exportExpenseReport(this.data);
    workbook.saveAsync('ExpenseReport.xlsx');
  } */

 /* private _exportExpenseReport(employees: any[]): wjcXlsx.WorkSheet {
       var book = new wjcXlsx.Workbook();
       var dateFormat = wjcXlsx.Workbook.toXlsxDateFormat('d'),
          stdNumWidth = 85,
          simpleCaptionStyle = new wjcXlsx.WorkbookStyle(),
          accentCaptionStyle = new wjcXlsx.WorkbookStyle(),
          totalCaptionStyle = new wjcXlsx.WorkbookStyle(),
          valueStyle = new wjcXlsx.WorkbookStyle(),
          highlightedValueStyle = new wjcXlsx.WorkbookStyle(),
          tableHeaderStyle = new wjcXlsx.WorkbookStyle(),
          tableFooterCurrencyStyle = new wjcXlsx.WorkbookStyle(),
          tableValueStyle = new wjcXlsx.WorkbookStyle(),
          tableDateStyle = new wjcXlsx.WorkbookStyle(),
          tableCurrencyStyle = new wjcXlsx.WorkbookStyle(),
          tableIntegerStyle = new wjcXlsx.WorkbookStyle();
        
        /*simpleCaptionStyle.hAlign = wjcXlsx.HAlign.Right;

        accentCaptionStyle.font = new wjcXlsx.WorkbookFont();
		    accentCaptionStyle.font.color = '#808097';

        totalCaptionStyle.basedOn = simpleCaptionStyle;
        totalCaptionStyle.font = new wjcXlsx.WorkbookFont();
        totalCaptionStyle.font.bold = true;
        totalCaptionStyle.hAlign = wjcXlsx.HAlign.Right;

        valueStyle.font = new wjcXlsx.WorkbookFont();
		    valueStyle.font.family = 'Arial';

        highlightedValueStyle.basedOn = valueStyle;
        highlightedValueStyle.fill = new wjcXlsx.WorkbookFill();
        highlightedValueStyle.fill.color = '#e1e1e1';

        tableHeaderStyle.font = new wjcXlsx.WorkbookFont();
        tableHeaderStyle.font.bold = true;
        tableHeaderStyle.fill = new wjcXlsx.WorkbookFill();
        tableHeaderStyle.fill.color = '#fad9cd';

        tableFooterCurrencyStyle.basedOn = tableHeaderStyle;
        tableFooterCurrencyStyle.format = wjcXlsx.Workbook.toXlsxNumberFormat('c2');
        tableFooterCurrencyStyle.hAlign = wjcXlsx.HAlign.Right;

        tableValueStyle.fill = new wjcXlsx.WorkbookFill();
		    tableValueStyle.fill.color = '#f4b19b';

        tableDateStyle.basedOn = tableValueStyle;

        tableCurrencyStyle.basedOn = tableValueStyle;
        tableCurrencyStyle.format = wjcXlsx.Workbook.toXlsxNumberFormat('c2');

        tableIntegerStyle.basedOn = tableValueStyle;
        tableIntegerStyle.format = wjcXlsx.Workbook.toXlsxNumberFormat('00');

        for (var emplIdx = 0; emplIdx < this.data.length; emplIdx++) {
          
    
  }*/

  // LLENANDO MI DATA DE TODOS LOS DATOS 
  getData(){
    this.dataService.getCustomerList().subscribe((resp)=>
    {
     this.data = [];
     var rfc = [];
     var razonSocial = [];
     var persona = [];
     var nombres = [];
     var telefonos = [];
     var id = [];
     var flag = [];
     //FOR PARA DATOS DE ARREGLOS
     for(var j in resp){
          id[j] = (resp[j].id);
          flag[j] = (resp[j].flag_bloqueo);
          rfc[j]=(resp[j].rfc);
          razonSocial[j]=(resp[j].razonSocial);
          persona[j]=(resp[j].persona);
          nombres[j]=(resp[j].nombre1);
          telefonos[j]=(resp[j].telefono);
          
     }    
     //FOR PARA MOSTRA DATOS
     for(var i=1; i<= resp.length; i++){
        this.data.push({
           No: i, 
           id: id[i % resp.length],
           flag: flag[i % resp.length],
           RFC: rfc[i % resp.length],
           RazonSocial : razonSocial[i % resp.length],
           Persona:  persona[i % resp.length],
           Nombre :  nombres[i % resp.length],
           Telefono: telefonos[i % resp.length],
           rating: Math.floor(Math.random() * 5),
       })
     }
    })
    return this.data;
     
  }
  // templates
  tplRating = CellMaker.makeRating({
    range: [0, 5],
    label: 'Edit Product Rating'
  });

  //IICIALIZANDO LA GRID DE WIJMO
  initGrid(grid: grid.FlexGrid) {
    this.selector = new Selector(grid,{itemChecked: () => 
      {
          this.selectedItems = grid.rows.filter(r => r.isSelected);
          for(var i in this.selectedItems){
            var id = this.selectedItems[i]._data['id']
            //console.log(id);
             
          }
          return id;
         // this.deleteCustomer(this.selectedItems[0].data);
          return this.selectedItems;
      }
    });
  }
  //SELECTOR HEADERS WIJMO 
  setHeaders(headersOn: boolean) {
    let theGrid = this.selector.column.grid;
    theGrid.headersVisibility = headersOn
        ? HeadersVisibility.All
        : HeadersVisibility.Column;
    this.selector.column = headersOn
        ? theGrid.rowHeaders.columns[0]
        : theGrid.columns[0];
    this.headers = headersOn;
  }

  // Columnas
  displayedColumns: string[] = [
    'select',
    'position',
    'rfc',
    'razonSocial',
    'persona',
    'nombre1',
    'telefono',
  ];

  ngOnInit() {
    this.cargando = true;
    this.clientesService.getCustomerList().subscribe((resp) =>
     {
      //console.log(resp);
      this.clientes = resp;
      this.cargando = false;
      this.dataSource.data = this.clientes;
      //console.log(this.dataSource);
    });
  }

  // dataSource = new MatTableDataSource<AltaClienteInterface>(this.clientes);
  selection = new SelectionModel<AltaClienteModel>(true, []);

  // Pantalla de busqueda de clientes
  searchCustomers() {
    this.router.navigateByUrl('/searchCustomers');
  }

  // Borrar cliente
  /*
  deleteCustomer(cliente: AltaClienteModel) {
    // Borrar registro en Firebase
    this.clientesService.deleteCustomer(cliente.id).subscribe();
  }*/
  
  deleteCustomer(cliente: string) {
    // Borrar registro en Firebase
    this.clientesService.deleteCustomer(cliente).subscribe();
  }

  // Cerrar sesión
  logout() {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Cerrar sesión',
      text: '¿Desea cerrar sesión?',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.auth.logout();
        this.router.navigateByUrl('/login');
      }
    });
  }

  // Editar registro
  editCustomer() {
    if (this.selectedItems.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ningún registro seleccionado',
        text: 'Debe seleccionar al menos un registro...',
        showConfirmButton: true,
        showCancelButton: false,
      });
      return;
    } else if (this.selectedItems.length > 1) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Seleccionar 1 solo registro',
        text: 'Solo se permite editar 1 cliente a la vez...',
        showConfirmButton: true,
        showCancelButton: false,
      });
    } else if (this.selectedItems.length == 1) {
      for (let customer in this.selectedItems) {
        //console.log(this.selectedItems[customer]._data);
        this.router.navigateByUrl(`/customer/${this.selectedItems[customer]._data['id']}`);
      }
    }
  }


  // Eliminar registros seleccionados
  deleteCustomers() {
    if (this.selectedItems.length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ningún registro seleccionado',
        text: 'Debe seleccionar al menos un registro...',
        showConfirmButton: true,
        showCancelButton: false,
        
      });
      return;
    }
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Eliminar registro de clientes',
      text: '¿Confirma eliminar los registros de clientes seleccionados?',
      showConfirmButton: true,
      showCancelButton: true,
      
    }).then((resp) => {
      for(var i in this.selectedItems){
         console.log(this.selectedItems[i]._data['id']);
         this.deleteCustomer(this.selectedItems[i]._data['id']); 
         
      }
      this.router.navigateByUrl('refresh',{ skipLocationChange:true }).then(()=>{
        console.log(decodeURI(this._location.path()));
        this.router.navigate([decodeURI(this._location.path())]);
      }); 
    }); 
   
  }

   ngDoCheck(){
         
   }

  // Bloquear/Desbloquear cliente(s)
  setFlagBloq(flag: string, action: string) {
    // Validar que se haya seleccionado un registro
    if (this.selectedItems.length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Ningún registro seleccionado',
        text: 'Debe seleccionar al menos un registro...',
        showConfirmButton: true,
        showCancelButton: false,
      });
      return;
    }

    Swal.fire({
      position: 'center',
      icon: 'question',
      title: `${action} clientes seleccionados`,
      text: `¿Confirma ${action} clientes seleccionados?`,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      // Observable para control de mensaje
      let peticion: Observable<any>;
      if (resp.value) {
        // Recorrer arreglo de info seleccionada
        for (let index in this.selectedItems) {
          // Recorrer el arreglo original para obtener indice en tabla
          for (let cliente of this.clientes) {
            if (this.selectedItems[index]._data['id'] === cliente.id ) {
              cliente.flag_bloqueo = flag;
              if(this.data[index].flag != cliente.flag_bloqueo ){
                this.selectedItems[index]._data.flag_bloqueo = flag;
                peticion = this.clientesService.updateCustomer(cliente);

                peticion.subscribe((resp) => {
                  Swal.fire({
                  position: 'center',
                  icon:     'success',
                  title:     'Registros actualizados',
                  text:      'Se actualizo correctamente',
                });
                this.router.navigateByUrl('refresh',{ skipLocationChange:true }).then(()=>{
                  console.log(decodeURI(this._location.path()));
                  this.router.navigate([decodeURI(this._location.path())]);
                });
              });
              }else
              {
                if(this.data[index].flag == 'L' && cliente.flag_bloqueo =='L' )
                {
                    Swal.fire({
                      position: 'center',
                      icon:     'warning',
                      title:     'Usuario Bloqueado',
                      text:      'Usuario Bloqueado Anteriormente',
                    });
                 
                }
                else if (this.data[index].flag == 'U' && (cliente.flag_bloqueo =='U' || cliente.flag_bloqueo == '' ))
                {
                  Swal.fire({
                    position: 'center',
                    icon:     'warning',
                    title:     'Usuario Desbloqueado',
                    text:      'Usuario Desbloqueado o sin Flag para desbloquear',
                  });

                }
              } 
              //console.log(this.data[index].flag);
              //console.log(cliente.flag_bloqueo);
            }
          }
        }
       

      // Liberar pantalla
      /*peticion.subscribe((resp) => {
          Swal.fire({
          position: 'center',
          icon:     'success',
          title:     'Registros actualizados',
          text:      'Se actualizo correctamente',
        });
        this.router.navigateByUrl('refresh',{ skipLocationChange:true }).then(()=>{
          console.log(decodeURI(this._location.path()));
          this.router.navigate([decodeURI(this._location.path())]);
        });
      });*/
      
      }
    });
  }

  // Validar si todos los registros están seleccionados
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Seleccionar todos los registro | Caso contrario quitar selección
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AltaClienteModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
