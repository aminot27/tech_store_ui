import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductPresentationService } from 'src/app/services/api/product-presentation.service'; // This service should be created or updated accordingly
import { ToastrService } from 'ngx-toastr';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-product-presentation-delete',
  templateUrl: './product-presentation-delete.component.html',
  styleUrls: ['./product-presentation-delete.component.scss']
})
export class ProductPresentationDeleteComponent implements OnInit, OnDestroy {
  title = 'PRESENTACIÓN DE PRODUCTO';
  id: number;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductPresentationDeleteComponent>,
    private productPresentationService: ProductPresentationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.data.product_presentation_id;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onConfirm(id: number): void {
    this.productPresentationService.deleteProductPresentation(this.id) 
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.toastr.error('Error al eliminar la presentación del producto'); 
      }
    });
  }
}