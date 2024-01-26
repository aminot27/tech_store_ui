import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductSubcategoryService } from 'src/app/services/api/product-subcategory.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-product-subcategory-delete',
  templateUrl: './product-subcategory-delete.component.html',
  styleUrls: ['./product-subcategory-delete.component.scss']
})
export class ProductSubcategoryDeleteComponent implements OnInit, OnDestroy {
  title = 'CATEGORÍA PRODUCTO';
  id: number;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductSubcategoryDeleteComponent>,
    private ProductSubcategoryService: ProductSubcategoryService,
    private toastr: ToastrService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.id = this.data.product_subcategory_id;
  }

  onConfirm(id: number): void {
    this.ProductSubcategoryService.deleteProductSubcategory(this.data.product_subcategory_id)
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