import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificationRoutingModule } from './specification-routing.module';
import { SpecificationAddComponent } from './specification-add/specification-add.component';
import { SpecificationEditComponent } from './specification-edit/specification-edit.component';
import { SpecificationDeleteComponent } from './specification-delete/specification-delete.component';
import { SpecificationListComponent } from './specification-list/specification-list.component';
import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import { GenericDeleteModule } from 'src/app/containers/generic-delete/generic-delete.module';

@NgModule({
  declarations: [
    SpecificationAddComponent,
    SpecificationEditComponent,
    SpecificationDeleteComponent,
    SpecificationListComponent,
  ],
  imports: [
    CommonModule,
    SpecificationRoutingModule,
    GenericTableModule,
    MatDialogModule,
    GenericFormModule,
    GenericDeleteModule
  ]
})
export class SpecificationModule { }
