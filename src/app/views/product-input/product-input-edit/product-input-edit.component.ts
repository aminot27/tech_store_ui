import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductInputService } from 'src/app/services/api/product-input.service';
import { ToastrService } from 'ngx-toastr';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-input-edit',
  templateUrl: './product-input-edit.component.html',
  styleUrls: ['./product-input-edit.component.scss']
})
export class ProductInputEditComponent implements OnDestroy {
  title: string = 'EDITAR ENTRADA DE PRODUCTO';
  productInputFormConfig: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private productInputService: ProductInputService,
    public dialogRef: MatDialogRef<ProductInputEditComponent>,
    private toastr: ToastrService
  ) {
    this.productInputFormConfig = [
      { name: 'product', label: 'Product ID', type: 'number', required: true, value: data.productInput.product },
      { name: 'quantity', label: 'Quantity', type: 'number', required: true, value: data.productInput.quantity },
      { name: 'movementDate', label: 'Movement Date', type: 'date', required: true, value: data.productInput.movementDate },
      { name: 'reason', label: 'Reason', type: 'text', required: false, maxLength: 100, value: data.productInput.reason }
    ];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onSubmit(event: any): void {
    this.productInputService.updateProductInput(this.data.productInput.id, event)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.dialogRef.close(true);
          this.toastr.success('Entrada de producto actualizada con éxito.', 'Éxito', successToasterConfig);
        },
        error => {
          if (error.status === 400) {
          } else {
            
          }
        }
      );
  }
}