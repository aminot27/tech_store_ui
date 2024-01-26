import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnitService } from 'src/app/services/api/unit.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-unit-delete',
  templateUrl: './unit-delete.component.html',
  styleUrls: ['./unit-delete.component.scss']
})
export class UnitDeleteComponent implements OnInit, OnDestroy {
  title = 'UNIDAD';
  id: number;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UnitDeleteComponent>,
    private unitService: UnitService,
    private toastr: ToastrService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.id = this.data.unit_id;
  }

  onConfirm(id: number): void {
    this.unitService.deleteUnit(this.data.unit_id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
      }
    });
  }
}