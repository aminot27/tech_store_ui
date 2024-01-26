import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnitService } from 'src/app/services/api/unit.service';
import { MatDialogRef } from '@angular/material/dialog';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.scss']
})
export class UnitEditComponent  implements OnDestroy{
  title: string = 'EDITAR UNIDAD';
  unitFormConfig: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private unitService: UnitService, 
    public dialogRef: MatDialogRef<UnitEditComponent>, 
    private toastr: ToastrService
  ) {
    this.unitFormConfig = [
      { name: 'name', label: 'Nombre', type: 'text', required: true, maxLength: 10, value: this.data.unit.name },
      { name: 'abbreviation', label: 'Abreviatura', type: 'text', required: true, maxLength: 5, value: this.data.unit.abbreviation }
    ];
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onSubmit(event: any): void {
    this.unitService.updateUnit(this.data.unit.unit_id, event)
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.dialogRef.close(true);
        },
        error => {
        }
      );
  }
}