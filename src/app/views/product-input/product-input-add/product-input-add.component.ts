import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductInputService } from 'src/app/services/api/product-input.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from 'src/app/services/api/product.service';
import { successToasterConfig } from 'src/app/constats/toaster.configs';

@Component({
  selector: 'app-product-input-add',
  templateUrl: './product-input-add.component.html',
  styleUrls: ['./product-input-add.component.scss']
})

export class ProductInputAddComponent implements OnInit, OnDestroy {
  title = 'AÑADIR ENTRADA DE PRODUCTOS';
  products = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  formConfig = [
    { name: 'product', label: 'Producto', type: 'select', options: this.products, required: true },
    { name: 'quantity', label: 'Cantidad', type: 'number', required: true },
    { name: 'movementDate', label: 'Fecha de Movimiento', type: 'date', required: true },
    { name: 'reason', label: 'Razón', type: 'text', required: false, maxLength: 100 }
  ];

  constructor(
    private ProductInputService: ProductInputService,
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<ProductInputAddComponent>,
    private toastr: ToastrService,
    private productService: ProductService 
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadProducts() {
    this.productService.getProducts()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.products = data.map(product => ({ value: product.product_id, viewValue: product.name }))
        const productField = this.formConfig.find(field => field.name === 'product');
        if (productField) {
          productField.options = this.products;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar los productos');
      }
    );
  }

  onFormSubmit(formValue: any) {
    const productId = formValue.product;
    const quantityToAdd = +formValue.quantity;
  
    this.productService.getProduct(productId).subscribe(
      product => {
        const currentStock = +product.stock;
  
        const updatedStock = currentStock + quantityToAdd;
  
        const updatedProductData = {
          ...product,
          stock: updatedStock
        };
  
        this.productService.updateProduct(productId, updatedProductData).subscribe(
          () => {
            
            this.ProductInputService.addProductInput(formValue).subscribe(
              data => {
                this.crudEventsService.itemAdded.next();
                this.dialogRef.close();
              },
              error => {
                
              }
            );
          },
          error => {
            
          }
        );
      },
      error => {
      
      }
    );
  }

}
