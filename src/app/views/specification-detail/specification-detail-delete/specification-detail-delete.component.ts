import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpecificationDetailService } from 'src/app/services/api/specification-detail.service'; // Make sure to import the correct service
import { ToastrService } from 'ngx-toastr';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-specification-detail-delete',
  templateUrl: './specification-detail-delete.component.html',
  styleUrls: ['./specification-detail-delete.component.scss']
})
export class SpecificationDetailDeleteComponent implements OnInit, OnDestroy {
  title = 'DETALLE DE ESPECIFICACIÓN';
  id: number;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SpecificationDetailDeleteComponent>,
    private specificationDetailService: SpecificationDetailService, 
    private toastr: ToastrService
  ) {
    console.log(data);
    
  
  }

  ngOnInit(): void {
    this.id = this.data.specification_detail_id;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onConfirm(id: number): void {
    this.specificationDetailService.deleteSpecificationDetail(this.id) 
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