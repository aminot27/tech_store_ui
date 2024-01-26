import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit-routing.module';
import { UnitAddComponent } from './unit-add/unit-add.component';
import { UnitDeleteComponent } from './unit-delete/unit-delete.component';
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { UnitListComponent } from './unit-list/unit-list.component';

import { MatDialogModule } from '@angular/material/dialog';

import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import {GenericDeleteModule} from 'src/app/containers/generic-delete/generic-delete.module';

@NgModule({
  declarations: [
    UnitAddComponent,
    UnitDeleteComponent,
    UnitEditComponent,
    UnitListComponent
  ],
  imports: [
    CommonModule,
    UnitRoutingModule,
    GenericTableModule,
    GenericFormModule,
    GenericDeleteModule,
    MatDialogModule
  ]
})
export class UnitModule { }
