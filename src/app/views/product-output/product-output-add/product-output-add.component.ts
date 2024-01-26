import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductOutputService } from 'src/app/services/api/product-output.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from 'src/app/services/api/product.service';

@Component({
  selector: 'app-product-output-add',
  templateUrl: './product-output-add.component.html',
  styleUrls: ['./product-output-add.component.scss']
})
export class ProductOutputAddComponent implements OnInit, OnDestroy {
  title = 'AÑADIR SALIDA DE PRODUCTOS';
  products = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  formConfig = [
    { name: 'product', label: 'Producto', type: 'select', options: this.products, required: true },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true },
    { name: 'movementDate', label: 'Movement Date', type: 'date', required: true },
    { name: 'reason', label: 'Reason', type: 'text', required: false, maxLength: 100 }
  ];

  constructor(
    private productOutputService: ProductOutputService,
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<ProductOutputAddComponent>,
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
    const selectedProductId = formValue.product;
    const outputQuantity = formValue.quantity;
  
    this.productService.getProduct(selectedProductId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        product => {
         
          if (product.stock >= outputQuantity) {
            
            const updatedProductData = {
              ...product,
              stock: product.stock - outputQuantity
            };
  
            this.productService.updateProduct(selectedProductId, updatedProductData)
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe(
                () => {
              
                  this.productOutputService.addProductOutput(formValue)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe(
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
          } else {
          
            this.toastr.error('Stock insuficiente para la salida del producto.');
          }
        },
        error => {
          this.toastr.error('Error al obtener los detalles del producto.');
        }
      );
  }
}