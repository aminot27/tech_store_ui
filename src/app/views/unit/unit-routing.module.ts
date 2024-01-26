import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitListComponent } from './unit-list/unit-list.component';

const routes: Routes = [
  {
    path: '',
    component: UnitListComponent,
    data: {
      title: 'Unidades'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }
