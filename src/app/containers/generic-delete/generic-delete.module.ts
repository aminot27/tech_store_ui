import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericDeleteComponent } from './generic-delete.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [GenericDeleteComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [GenericDeleteComponent]
})
export class GenericDeleteModule { }
