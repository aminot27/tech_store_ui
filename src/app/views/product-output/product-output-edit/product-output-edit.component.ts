import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductOutputService } from 'src/app/services/api/product-output.service';
import { ToastrService } from 'ngx-toastr';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-output-edit',
  templateUrl: './product-output-edit.component.html',
  styleUrls: ['./product-output-edit.component.scss']
})
export class ProductOutputEditComponent implements OnDestroy{
  title: string = 'EDITAR SALIDA DE PRODUCTO';
  productOutputFormConfig: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private productOutputService: ProductOutputService,
    public dialogRef: MatDialogRef<ProductOutputEditComponent>,
    private toastr: ToastrService
  ) {
    this.productOutputFormConfig = [
      { name: 'product', label: 'Product ID', type: 'number', required: true, value: data.productOutput.product },
      { name: 'quantity', label: 'Quantity', type: 'number', required: true, value: data.productOutput.quantity },
      { name: 'movementDate', label: 'Movement Date', type: 'date', required: true, value: data.productOutput.movementDate },
      { name: 'reason', label: 'Reason', type: 'text', required: false, maxLength: 100, value: data.productOutput.reason }
    ];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onSubmit(event: any): void {
    this.productOutputService.updateProductOutput(this.data.productOutput.id, event)
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.dialogRef.close(true);
          this.toastr.success('Salida de producto actualizada con éxito.', 'Éxito', successToasterConfig);
        },
        error => {
          if (error.status === 400) {
          } else {
          }
        }
      );
  }
}