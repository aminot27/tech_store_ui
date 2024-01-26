import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';

const routes: Routes = [
  {
    path: '',
    component: SubcategoryListComponent,
    data: {
      title: 'Subcategorias'
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoryRoutingModule { }
