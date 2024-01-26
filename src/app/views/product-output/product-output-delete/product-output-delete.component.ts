import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductOutputService } from 'src/app/services/api/product-output.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-product-output-delete',
  templateUrl: './product-output-delete.component.html',
  styleUrls: ['./product-output-delete.component.scss']
})
export class ProductOutputDeleteComponent implements OnInit, OnDestroy {
  title = 'SALIDA DE PRODUCTO';
  id: number;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductOutputDeleteComponent>,
    private productOutputService: ProductOutputService,
    private toastr: ToastrService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.id = this.data.product_output_id;
  }

  onConfirm(id: number): void {
    this.productOutputService.deleteProductOutput(this.data.product_output_id)
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