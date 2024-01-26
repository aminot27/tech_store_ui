import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductOutputRoutingModule } from './product-output-routing.module';
import { ProductOutputListComponent } from './product-output-list/product-output-list.component';
import { ProductOutputEditComponent } from './product-output-edit/product-output-edit.component';
import { ProductOutputDeleteComponent } from './product-output-delete/product-output-delete.component';
import { ProductOutputAddComponent } from './product-output-add/product-output-add.component';
import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import { GenericDeleteModule } from 'src/app/containers/generic-delete/generic-delete.module';

@NgModule({
  declarations: [
    ProductOutputListComponent,
    ProductOutputEditComponent,
    ProductOutputDeleteComponent,
    ProductOutputAddComponent
  ],
  imports: [
    CommonModule,
    ProductOutputRoutingModule,
    GenericTableModule,
    MatDialogModule,
    GenericFormModule,
    GenericDeleteModule
  ]
})
export class ProductOutputModule { }
