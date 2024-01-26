import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductInputListComponent } from './product-input-list/product-input-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductInputListComponent,
    data: {
      title: 'Product Input'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductInputRoutingModule { }
