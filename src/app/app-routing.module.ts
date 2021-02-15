import { NgModule              } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { CustomerComponent     } from './pages/customer/customer.component';
import { HomeComponent         } from './pages/home/home.component';
import { LoginComponent        } from './pages/login/login.component';
import { AuthGuard             } from './guards/auth.guard';
import { CustomerListMComponent } from './pages/customer-list-m/customer-list-m.component';
import { SelectOptionsComponent } from './shared/select-options/select-options.component';
import { SearchCustomersComponent } from './pages/search-customers/search-customers.component';
import { ListClientComponent } from './pages/list-client/list-client.component';

const ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'customer/:id', component: CustomerComponent, canActivate: [ AuthGuard ] },
  { path: 'customerListM', component: CustomerListMComponent, canActivate: [ AuthGuard ] },
  { path: 'selectOptions', component: SelectOptionsComponent, canActivate: [ AuthGuard ] },
  { path: 'searchCustomers', component: SearchCustomersComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginComponent },
  { path: 'refresh', component: CustomerListMComponent },
  { path: 'lista-clientes', component: ListClientComponent },
  { path: 'selectOptions/:param', component: SelectOptionsComponent, canActivate: [ AuthGuard ] },
  { path: 'selectOptions/:param/:low', component: SelectOptionsComponent, canActivate: [ AuthGuard ] },
  { path: 'selectOptions/:param/:low/:high', component: SelectOptionsComponent, canActivate: [ AuthGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
