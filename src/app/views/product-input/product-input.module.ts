import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductInputRoutingModule } from './product-input-routing.module';
import { ProductInputAddComponent } from './product-input-add/product-input-add.component';
import { ProductInputListComponent } from './product-input-list/product-input-list.component';
import { ProductInputEditComponent } from './product-input-edit/product-input-edit.component';
import { ProductInputDeleteComponent } from './product-input-delete/product-input-delete.component';
import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import { GenericDeleteModule } from 'src/app/containers/generic-delete/generic-delete.module'; 

@NgModule({
  declarations: [
    ProductInputAddComponent,
    ProductInputListComponent,
    ProductInputEditComponent,
    ProductInputDeleteComponent
  ],
  imports: [
    CommonModule,
    ProductInputRoutingModule,
    GenericTableModule,
    MatDialogModule,
    GenericFormModule,
    GenericDeleteModule
  ]
})
export class ProductInputModule { }
