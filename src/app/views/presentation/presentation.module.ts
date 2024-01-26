import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationRoutingModule } from './presentation-routing.module';
import { PresentationAddComponent } from './presentation-add/presentation-add.component';
import { PresentationDeleteComponent } from './presentation-delete/presentation-delete.component';
import { PresentationEditComponent } from './presentation-edit/presentation-edit.component';
import { PresentationListComponent } from './presentation-list/presentation-list.component';

import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import { GenericDeleteModule } from 'src/app/containers/generic-delete/generic-delete.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    PresentationAddComponent,
    PresentationDeleteComponent,
    PresentationEditComponent,
    PresentationListComponent,
  ],
  imports: [
    CommonModule,
    PresentationRoutingModule,
    GenericTableModule,
    GenericFormModule,
    MatDialogModule,
    GenericDeleteModule
  ]
})
export class PresentationModule { }
