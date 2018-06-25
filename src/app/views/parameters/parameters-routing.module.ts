import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { CurrenciesComponent } from './currencies/currencies.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Parameters'
    },
    children: [
      {
        path: 'countries',
        component: CountriesComponent,
        data: {
          title: 'Country'
        }
      },
      {
        path: 'currencies',
        component: CurrenciesComponent,
        data: {
          title: 'Currency'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule {}
