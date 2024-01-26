import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';

import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { GenericTableModule } from 'src/app/containers/generic-table/generic-table.module';
import { GenericFormModule } from 'src/app/containers/generic-form/generic-form.module';
import { GenericDeleteModule } from 'src/app/containers/generic-delete/generic-delete.module';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryAddComponent,
    CategoryDeleteComponent,
    CategoryEditComponent,
    
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    GenericTableModule,
    GenericFormModule,
    GenericDeleteModule
  ]
})
export class CategoryModule { }
