import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductSubcategoryService } from 'src/app/services/api/product-subcategory.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SubcategoryService } from 'src/app/services/api/subcategory.service';
import { ProductService } from 'src/app/services/api/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-subcategory-add',
  templateUrl: './product-subcategory-add.component.html',
  styleUrls: ['./product-subcategory-add.component.scss']
})
export class ProductSubcategoryAddComponent implements OnInit, OnDestroy {
  title = 'AÑADIR SUBCATEGORÍA DE PRODUCTOS';
  subcategories = [];
  products = [];
  private unsubscribe$: Subject<any> = new Subject<any>();


  formConfig = [
    { name: 'product', label: 'Producto', type: 'select', options: this.products, required: true },
    { name: 'subcategory', label: 'Subcategoría', type: 'select', options: this.subcategories, required: true }
  ];

  constructor(
    private productSubcategoryService: ProductSubcategoryService,
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<ProductSubcategoryAddComponent>,
    private toastr: ToastrService,
    private subcategoryService: SubcategoryService,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.loadSubcategories();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadSubcategories() {
    this.subcategoryService.getSubcategories()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.subcategories = data.map(subcategory => ({ value: subcategory.subcategory_id, viewValue: subcategory.description }))
        const subcategoryField = this.formConfig.find(field => field.name === 'subcategory');
        if (subcategoryField) {
          subcategoryField.options = this.subcategories;
        }
      },
      (error) => {
      }
    );
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
      }
    );
  }

  onFormSubmit(formValue: any) {
    this.productSubcategoryService.addProductSubcategory(formValue)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      data => {
        this.crudEventsService.itemAdded.next();
        this.dialogRef.close();
      },
      error => {
      }
    );
  }
}