import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPresentationRoutingModule } from './product-presentation-routing.module';
import { ProductPresentationAddComponent } from './product-presentation-add/product-presentation-add.component';
import { ProductPresentationDeleteComponent } from './product-presentation-delete/product-presentation-delete.component';
import { ProductPresentationEditComponent } from './product-presentation-edit/product-presentation-edit.component';
import { ProductPresentationListComponent } from './product-presentation-list/product-presentation-list.component';
import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericDeleteModule } from 'src/app/containers/generic-delete/generic-delete.module';

@NgModule({
  declarations: [
    ProductPresentationAddComponent,
    ProductPresentationDeleteComponent,
    ProductPresentationEditComponent,
    ProductPresentationListComponent,
    
  ],
  imports: [
    CommonModule,
    ProductPresentationRoutingModule,
    GenericTableModule,
    GenericFormModule,
    MatDialogModule,
    GenericDeleteModule
  ]
})
export class ProductPresentationModule { }
