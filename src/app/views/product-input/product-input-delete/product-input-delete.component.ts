import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductInputService } from 'src/app/services/api/product-input.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-product-input-delete',
  templateUrl: './product-input-delete.component.html',
  styleUrls: ['./product-input-delete.component.scss']
})
export class ProductInputDeleteComponent implements OnInit, OnDestroy {
  title = 'ENTRADA DE PRODUCTO';
  id: number;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductInputDeleteComponent>,
    private productInputService: ProductInputService,
    private toastr: ToastrService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.id = this.data.product_input_id;
  }

  onConfirm(id: number): void {
    this.productInputService.deleteProductInput(this.data.product_input_id)
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