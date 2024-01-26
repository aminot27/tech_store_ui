import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductDetailDeleteComponent } from './product-detail-delete/product-detail-delete.component';
import { ProductDetailEditComponent } from './product-detail-edit/product-detail-edit.component';
import { ProductDetailAddComponent } from './product-detail-add/product-detail-add.component';
import { ProductDetailListComponent } from './product-detail-list/product-detail-list.component';
import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericDeleteModule } from 'src/app/containers/generic-delete/generic-delete.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [
    ProductDetailDeleteComponent,
    ProductDetailEditComponent,
    ProductDetailAddComponent,
    ProductDetailListComponent
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    GenericTableModule,
    GenericFormModule,
    MatDialogModule,
    GenericDeleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule
  ]
})
export class ProductDetailModule { }
