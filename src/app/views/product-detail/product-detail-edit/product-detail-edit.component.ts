import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ProductDetailService } from 'src/app/services/api/product-detail.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { ProductService } from 'src/app/services/api/product.service';
import { BrandService } from 'src/app/services/api/brand.service';

@Component({
  selector: 'app-product-detail-edit', 
  templateUrl: './product-detail-edit.component.html',
  styleUrls: ['./product-detail-edit.component.scss']
})
export class ProductDetailEditComponent implements OnInit {
  title = 'EDITAR DETALLE DE PRODUCTO';
  showAddButtonForSerial: boolean = false;
  products = [];
  brands = [];
  private unsubscribe$: Subject<any> = new Subject<any>();
  formConfig: any;

  constructor(
    private productDetailService: ProductDetailService,
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<ProductDetailEditComponent>, 
    private toastr: ToastrService,
    private productService: ProductService,
    private brandService: BrandService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formConfig = [
      { name: 'product', label: 'Producto', type: 'select', options: this.products, required: true, value: data.element.product },
      { name: 'serial_number', label: 'Número de Serie', type: 'text', required: true, value: data.element.serial_number },
    ];
  }

  ngOnInit() {
    this.loadProducts();
    this.loadBrands();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadBrands() {
    this.brandService.getBrands()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (brandsData) => {
        this.brands = brandsData;
        this.loadProducts();
      },
      (error) => {
        this.toastr.error('Error al cargar las marcas');
      }
    );
  }

  loadProducts() {
    this.brandService.getBrands().pipe(
      takeUntil(this.unsubscribe$),
      switchMap(brandsData => {
        this.brands = brandsData;
        return this.productService.getProducts();
      })
    ).subscribe(
      productsData => {
        const productField = this.formConfig.find(field => field.name === 'product');
        if (productField) {
          productField.options = productsData.map(product => ({
            value: product.product_id,
            viewValue: `${product.name} - ${this.brands.find(brand => brand.brand_id === product.brand)?.name || 'Marca no encontrada'} - ${product.small_description}`
          }));
          productField.value = this.data.element.product;
        }
      },
      error => this.toastr.error('Error al cargar los productos')
    );
  }

  
  onSubmit(formValue: any) {
    this.productDetailService.updateProductDetail(this.data.element.product_detail_id, formValue)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      data => {
        this.crudEventsService.itemUpdated.next();
        this.dialogRef.close(data);
      },
      error => {
        this.toastr.error('Error al actualizar el detalle del producto');
      }
    );
  }
}