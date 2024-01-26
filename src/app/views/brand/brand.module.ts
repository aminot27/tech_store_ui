import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { BrandDeleteComponent } from './brand-delete/brand-delete.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericDeleteModule } from 'src/app/containers/generic-delete/generic-delete.module';

@NgModule({
  declarations: [
    BrandAddComponent,
    BrandEditComponent,
    BrandDeleteComponent,
    BrandListComponent,
    
    
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    GenericTableModule,
    GenericFormModule,
    MatDialogModule,
    GenericDeleteModule
  ]
})
export class BrandModule { }
