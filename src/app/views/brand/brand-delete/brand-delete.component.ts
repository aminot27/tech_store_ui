import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { BrandService } from 'src/app/services/api/brand.service'; 

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.scss']
})
export class BrandDeleteComponent implements OnInit, OnDestroy {
  title = 'MARCA';
  id: number;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BrandDeleteComponent>,
    private brandService: BrandService, 
    private toastr: ToastrService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.id = this.data.brand_id; 
  }

  onConfirm(id: number): void {
    this.brandService.deleteBrand(this.data.brand_id) 
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