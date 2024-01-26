import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/api/product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { Subject, takeUntil } from 'rxjs';
import { BrandService } from 'src/app/services/api/brand.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  title: string = 'EDITAR PRODUCTO';
  productFormConfig: any;
  brands = [];
  private unsubscribe$: Subject<any> = new Subject<any>();
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductEditComponent>,
    private toastr: ToastrService,
    private brandService: BrandService,
  ) {
    this.productFormConfig = [
      { name: 'sku', label: 'SKU', type: 'text', required: true, maxLength: 10, value: this.data.product.sku },
      { name: 'name', label: 'Nombre', type: 'text', required: true, maxLength: 20, value: this.data.product.name },
      { name: 'description', label: 'Descripción', type: 'text', required: true, maxLength: 100, value: this.data.product.description },
      { name: 'small_description', label: 'Descripción Corta', type: 'text', required: false, maxLength: 50, value: this.data.product.small_description },
      { name: 'brand', label: 'Marca', type: 'select', options: this.brands, required: true, value: this.data.product.brand },
      { name: 'is_new', label: 'Es Nuevo', type: 'checkbox', required: false, value: this.data.product.is_new },
      { name: 'actual_price', label: 'Precio Actual', type: 'number', required: true, value: this.data.product.actual_price },
      { name: 'product_code', label: 'Código de Producto', type: 'text', required: true, maxLength: 20, value: this.data.product.product_code },
      { name: 'manufacturer_code', label: 'Código de Fabricante', type: 'text', required: true, maxLength: 20, value: this.data.product.manufacturer_code },
      { name: 'warranty_level', label: 'Nivel de Garantía', type: 'select', required: true, value: this.data.product.warranty_level, options: [{value: 'Marca', viewValue: 'Marca'}, {value: 'Mayorista', viewValue: 'Mayorista'}] },
      { name: 'stock', label: 'Stock', type: 'number', required: true, value: this.data.product.stock }
    ];
  }

  ngOnInit(): void {
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
      (data) => {
        this.brands = data.map(brand => ({ value: brand.brand_id, viewValue: brand.name }))
        const unitField = this.productFormConfig.find(field => field.name === 'brand');
        if (unitField) {
          unitField.options = this.brands;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar las unidades');
      }
    );
  }

  onSubmit(event: any): void {
    this.productService.updateProduct(this.data.product.product_id, event)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
        response => {
          this.dialogRef.close(true);
        },
        error => {
          if (error.status === 400) {
            this.toastr.error('Error en los datos enviados. Por favor, verifica la información.', 'Error', badRequestToasterConfig);
          } else {
           
          }
        }
      );
  }
}
