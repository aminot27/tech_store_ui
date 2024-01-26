import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationListComponent } from './presentation-list/presentation-list.component';

const routes: Routes = [
  {
    path: '',
    component: PresentationListComponent,
    data: {
      title: 'Presentaciones'
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationRoutingModule { }
