import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductOutputListComponent } from './product-output-list/product-output-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductOutputListComponent,
    data: {
      title: 'Product Output'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductOutputRoutingModule { }
