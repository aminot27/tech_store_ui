import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailListComponent } from './product-detail-list/product-detail-list.component';

const routes: Routes = [{
  path: '',
  component: ProductDetailListComponent,
  data: {
    title: 'Ingreso de Productos'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailRoutingModule { }
