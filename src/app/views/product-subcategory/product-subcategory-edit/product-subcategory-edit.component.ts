import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductSubcategoryService } from 'src/app/services/api/product-subcategory.service';
import { ToastrService } from 'ngx-toastr';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { Subject, takeUntil } from 'rxjs';
import { SubcategoryService } from 'src/app/services/api/subcategory.service';
import { ProductService } from 'src/app/services/api/product.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';


@Component({
  selector: 'app-product-subcategory-edit',
  templateUrl: './product-subcategory-edit.component.html',
  styleUrls: ['./product-subcategory-edit.component.scss']
})
export class ProductSubcategoryEditComponent implements OnInit, OnDestroy{
  title: string = 'EDITAR SUBCATEGORÍA DE PRODUCTO';
  productSubcategoryFormConfig: any;
  subcategories = [];
  products = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private productSubcategoryService: ProductSubcategoryService,
    public dialogRef: MatDialogRef<ProductSubcategoryEditComponent>,
    private toastr: ToastrService,
    private subcategoryService: SubcategoryService,
    private productService: ProductService,
    private crudEventsService: CrudEventsService,
  ) {
    this.productSubcategoryFormConfig = [
      { name: 'product', label: 'Producto', type: 'select', options: this.products, required: true, value: data.element.product },
      { name: 'subcategory', label: 'Subcategoría', type: 'select', options: this.subcategories, required: true, value: data.element.subcategory}
    ];
  }

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
        const subcategoryField = this.productSubcategoryFormConfig.find(field => field.name === 'subcategory');
        if (subcategoryField) {
          subcategoryField.options = this.subcategories;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar las unidades');
      }
    );
  }

  loadProducts() {
    this.productService.getProducts()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.products = data.map(product => ({ value: product.product_id, viewValue: product.name }))
        const productField = this.productSubcategoryFormConfig.find(field => field.name === 'product');
        if (productField) {
          productField.options = this.products;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar las productos');
      }
    );
  }

  onSubmit(formValue: any) {
    this.productSubcategoryService.updateProductSubcategory(this.data.element.product_subcategory_id, formValue)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.crudEventsService.itemUpdated.next();
          this.dialogRef.close(true);
          },
        error => {
        }
      );
  }
}