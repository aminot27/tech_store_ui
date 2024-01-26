import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductSubcategoryListComponent } from './product-subcategory-list/product-subcategory-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductSubcategoryListComponent,
    data: {
      title: 'Subcategoría de Productos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSubcategoryRoutingModule { }
