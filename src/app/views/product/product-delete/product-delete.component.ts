import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/api/product.service';
import { successToasterConfig, serverErrorToasterConfig } from 'src/app/constats/toaster.configs';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent {
  title = 'PRODUCTO';
  id: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductDeleteComponent>,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.data.product_id;
  }

  onConfirm(id: number): void {
    this.productService.deleteProduct(this.data.product_id).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        if (error.status === 500) {
          this.toastr.error('Error al eliminar el producto.', 'Error', serverErrorToasterConfig);
        }
      }
    });
  }
}