import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/api/unit.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-unit-add',
  templateUrl: './unit-add.component.html',
  styleUrls: ['./unit-add.component.scss']
})
export class UnitAddComponent implements OnInit, OnDestroy {
  title = 'AÑADIR UNIDAD';
  private unsubscribe$: Subject<any> = new Subject<any>();

  formConfig = [
    { name: 'name', label: 'Nombre', type: 'text', required: true, maxLength: 10 },
    { name: 'abbreviation', label: 'Abreviatura', type: 'text', required: true, maxLength: 5 }
  ];

  constructor(
    private unitService: UnitService, 
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<UnitAddComponent>,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onFormSubmit(formValue: any) {
    this.unitService.addUnit(formValue)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      data => {
        this.crudEventsService.itemAdded.next();
        this.dialogRef.close();
      },
      error => {
      }
    );
  }
  
}