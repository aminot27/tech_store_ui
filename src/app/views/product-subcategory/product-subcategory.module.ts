import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSubcategoryRoutingModule } from './product-subcategory-routing.module';
import { ProductSubcategoryAddComponent } from './product-subcategory-add/product-subcategory-add.component';
import { ProductSubcategoryEditComponent } from './product-subcategory-edit/product-subcategory-edit.component';
import { ProductSubcategoryDeleteComponent } from './product-subcategory-delete/product-subcategory-delete.component';
import { ProductSubcategoryListComponent } from './product-subcategory-list/product-subcategory-list.component';
import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericDeleteModule } from 'src/app/containers/generic-delete/generic-delete.module';

@NgModule({
  declarations: [
    ProductSubcategoryAddComponent,
    ProductSubcategoryEditComponent,
    ProductSubcategoryDeleteComponent,
    ProductSubcategoryListComponent,
    
  ],
  imports: [
    CommonModule,
    ProductSubcategoryRoutingModule,
    GenericTableModule,
    GenericFormModule,
    MatDialogModule,
    GenericDeleteModule
  ]
})
export class ProductSubcategoryModule { }
