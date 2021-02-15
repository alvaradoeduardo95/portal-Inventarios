import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// HTTP Client module
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { AppRoutingModule  } from './app-routing.module';
import { AppComponent      } from './app.component';
import { NavbarComponent   } from './shared/navbar/navbar.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { RouterModule      } from '@angular/router';
import { HomeComponent     } from './pages/home/home.component';
import { LoginComponent    } from './pages/login/login.component';
import { SelectOptionsComponent } from './shared/select-options/select-options.component';
import { CustomerListMComponent } from './pages/customer-list-m/customer-list-m.component';

// Servicios
import { CatalogoCFDIService } from './services/catalogoCFDI.service';

// Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SearchCustomersComponent } from './pages/search-customers/search-customers.component';

// import Wijmo modules
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { WjGridFilterModule } from '@grapecity/wijmo.angular2.grid.filter';
import { ListClientComponent } from './pages/list-client/list-client.component';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
//import { Selector } from '@grapecity/wijmo.grid.selector';
import { WjGridSearchModule } from '@grapecity/wijmo.angular2.grid.search';





// apply Wijmo license key
import { setLicenseKey } from '@grapecity/wijmo';
setLicenseKey('localhost,968972248867378#B0P9ijIEJCLi4TPnFWT8YFZIFUTIh5cLJXcjFUR6l4ayk7LzdWO6c6KhtmTnd6KWJzUHdUUqVHTWZVTzA5YNhTNJdVWZx6aY3ydoB5TBFURllFal9WevpGVY34Ly9GVxhWc5hlTTF6Y6N4NhpUbLhkeSJnQzplbnJmWUpHbwlzQ9wkZ7cjeSlFV5FWZiF5d6BHSt9WTiFkSLtCdPdjRNtUYMZ5UwNTRZJlRa3CaUZkUO9kb89UOVNWaKFEV9MDdYRXe6UGRutSNmhDMvIDT0Vlc4Q7TSVmW84USDRENORGNmVDesV6YCpmW9FzNlxkS4ZkUKVVaDdzYEh7MsZzdolTOrdXd43ER9E4UoRFTadkMJhjYZRFZw86Ko56Y72yVZ3UM5hkQT9GN9gjY78UR7U4RR3yaUNWMTd7YPJWWwgUbxsSTxo7RENkcElVUzYHWCtyTDhVc4I5RDVDR8FGVOhWYiojITJCLiADRwQkNENjI0ICSiwCO8kjMwATMzQTM0IicfJye&Qf35VfikEMyIlI0IyQiwiIu3Waz9WZ4hXRgACdlVGaThXZsZEIv5mapdlI0IiTisHL3JSNJ9UUiojIDJCLi86bpNnblRHeFBCIyV6dllmV4J7bwVmUg2Wbql6ViojIOJyes4nILdDOIJiOiMkIsIibvl6cuVGd8VEIgc7bSlGdsVXTg2Wbql6ViojIOJyes4nI4YkNEJiOiMkIsIibvl6cuVGd8VEIgAVQM3EIg2Wbql6ViojIOJyes4nIzMEMCJiOiMkIsISZy36Qg2Wbql6ViojIOJyes4nIVhzNBJiOiMkIsIibvl6cuVGd8VEIgQnchh6QsFWaj9WYulmRg2Wbql6ViojIOJyebpjIkJHUiwiIxMzMxgDMgcjMwEDMyAjMiojI4J7QiwiI4N7boxWYj3GbiojIz5GRiwiIjVmbyVGdFJiOiEmTDJCLigzNzcjN8gDNyIzN9gjN9IiOiQWSiwSfiMjdwIDMyIiOiIXZ6JCLlNHbhZmOiI7ckJye0ICfuBk');


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomerComponent,
    HomeComponent,
    LoginComponent,
    SelectOptionsComponent,
    CustomerListMComponent,
    SearchCustomersComponent,
    ListClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    //IMPORTS PARA WIJMO
    WjGridModule,
    WjChartModule,
    WjGridFilterModule,
    WjInputModule,
    WjGridSearchModule,
    
    //Selector
  ],
  providers: [CatalogoCFDIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
enableProdMode();
// Bootstrap application with hash style navigation and global services.
platformBrowserDynamic().bootstrapModule(AppModule);
