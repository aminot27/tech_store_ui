import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpecificationService } from 'src/app/services/api/specification.service'; 
import { ToastrService } from 'ngx-toastr';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-specification-delete',
  templateUrl: './specification-delete.component.html',
  styleUrls: ['./specification-delete.component.scss']
})
export class SpecificationDeleteComponent implements OnInit, OnDestroy {
  title = 'ESPECIFICACIÓN';
  id: number;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SpecificationDeleteComponent>,
    private specificationService: SpecificationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.data.specification_id; 
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onConfirm(id: number): void {
    this.specificationService.deleteSpecification(this.id) 
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