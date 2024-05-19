import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyListComponent } from './currency-list/currency-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/currencies', pathMatch: 'full' },
  { path: 'currencies', component: CurrencyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
