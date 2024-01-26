import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoryRoutingModule } from './subcategory-routing.module';
import { SubcategoryListComponent } from './subcategory-list/subcategory-list.component';

import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubcategoryAddComponent } from './subcategory-add/subcategory-add.component';
import { SubcategoryDeleteComponent } from './subcategory-delete/subcategory-delete.component';
import { SubcategoryEditComponent } from './subcategory-edit/subcategory-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import {GenericDeleteModule} from 'src/app/containers/generic-delete/generic-delete.module';


@NgModule({
  declarations: [
    SubcategoryListComponent,
    SubcategoryAddComponent,
    SubcategoryDeleteComponent,
    SubcategoryEditComponent,
  ],
  imports: [
    CommonModule,
    SubcategoryRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    GenericTableModule,
    GenericFormModule,
    GenericDeleteModule
  ]
})
export class SubcategoryModule { }
