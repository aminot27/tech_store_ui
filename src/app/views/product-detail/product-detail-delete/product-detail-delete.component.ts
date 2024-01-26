import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailService } from 'src/app/services/api/product-detail.service';
import { successToasterConfig, serverErrorToasterConfig } from 'src/app/constats/toaster.configs';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-detail-delete',
  templateUrl: './product-detail-delete.component.html',
  styleUrls: ['./product-detail-delete.component.scss']
})
export class ProductDetailDeleteComponent implements OnInit, OnDestroy {
  title = 'DETALLE DEL PRODUCTO';
  id: number;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductDetailDeleteComponent>,
    private productDetailService: ProductDetailService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.data.productDetail_id;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onConfirm(id: number): void {
    this.productDetailService.deleteProductDetail(this.data.productDetail_id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.dialogRef.close(true);
        },
      error: (error) => {
        if (error.status === 500) {
          }
      }
    });
  }
}