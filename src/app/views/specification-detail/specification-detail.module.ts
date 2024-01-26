import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificationDetailRoutingModule } from './specification-detail-routing.module';
import { SpecificationDetailAddComponent } from './specification-detail-add/specification-detail-add.component';
import { SpecificationDetailEditComponent } from './specification-detail-edit/specification-detail-edit.component';
import { SpecificationDetailListComponent } from './specification-detail-list/specification-detail-list.component';
import { SpecificationDetailDeleteComponent } from './specification-detail-delete/specification-detail-delete.component';
import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericDeleteModule } from 'src/app/containers/generic-delete/generic-delete.module';

@NgModule({
  declarations: [
    SpecificationDetailAddComponent,
    SpecificationDetailEditComponent,
    SpecificationDetailListComponent,
    SpecificationDetailDeleteComponent
  ],
  imports: [
    CommonModule,
    SpecificationDetailRoutingModule,
    GenericTableModule,
    GenericFormModule,
    MatDialogModule,
    GenericDeleteModule
  ]
})
export class SpecificationDetailModule { }
