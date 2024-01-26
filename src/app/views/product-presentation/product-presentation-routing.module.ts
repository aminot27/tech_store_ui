import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPresentationListComponent } from './product-presentation-list/product-presentation-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductPresentationListComponent,
    data: {
      title: 'Presentación de Productos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPresentationRoutingModule { }
