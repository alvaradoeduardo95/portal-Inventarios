import '@grapecity/wijmo.styles/wijmo.css';
import * as wijmo from '@grapecity/wijmo';

import { Component, ViewChild, OnInit } from '@angular/core';
import * as input from '@grapecity/wijmo.input';
import * as grid from '@grapecity/wijmo.grid';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as pdf from '@grapecity/wijmo.pdf';
import { Selector } from '@grapecity/wijmo.grid.selector';
import { FlexGrid, HeadersVisibility } from '@grapecity/wijmo.grid';

//SERVICIO
import { ClientesService } from '../../services/clientes.service';
import { AltaClienteModel } from '../../models/altaCliente.model';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  // references FlexGrid named 'flex' in the view
  @ViewChild('thePopup', { static: true }) thePopup: input.Popup;
  @ViewChild('theGrid', { static: true }) flex: wjcGrid.FlexGrid;
  data: any[];
  selectedItems: any[] = [];
  selector: Selector = null;
  headers = true;

  ngOnInit(){
  
  }

  // DataSvc will be passed by derived classes
  constructor(private dataService: ClientesService) {
    this.data = this.getData();
  }

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
     //FOR PARA DATOS DE ARREGLOS
     for(var j in resp){
          id[j] = (resp[j].id);
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
           RFC: rfc[i % resp.length],
           RazonSocial : razonSocial[i % resp.length],
           Persona:  persona[i % resp.length],
           Nombre :  nombres[i % resp.length],
           Telefono: telefonos[i % resp.length],
       })
     }
      
    })
    return this.data;
     
  }

  deleteCustomer(cliente: string) {
    // Borrar registro en Firebase
    this.dataService.deleteCustomer(cliente).subscribe();
    console.log(cliente);
  }

  initGrid(grid: grid.FlexGrid) {

    this.selector = new Selector(grid, {
      itemChecked: () => {
          this.selectedItems = grid.rows.filter(r => r.isSelected);
          //console.log(this.selectedItems);
      }
    });
   
    grid.hostElement.addEventListener('keydown', e => 
    {
      let view = grid.collectionView;
        if (e.keyCode == wijmo.Key.Delete && view.currentItem) 
        {
          e.preventDefault();
          this.thePopup.show(true, (sender: input.Popup) => 
          {
            // delete the row
            if (sender.dialogResult == 'wj-hide-ok') {
                 //this.deleteCustomer(this.selectedItems[0]);
                //this.deleteCustomer(view.currentItem['id']);
                (<wijmo.CollectionView>view).remove(view.currentItem);
            }
            //
            // return focus to the grid
            grid.focus();
          });
        }
    }, true);
  }

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

  

  
  
}


