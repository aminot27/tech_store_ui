import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/api/product.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { Subject, takeUntil } from 'rxjs';
import { BrandService } from 'src/app/services/api/brand.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  title = 'AÑADIR PRODUCTO';
  brands = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  formConfig = [
    { name: 'name', label: 'Nombre', type: 'text', required: true, maxLength: 20 },
    { name: 'description', label: 'Descripción', type: 'text', required: true, maxLength: 100 },
    { name: 'small_description', label: 'Descripción Corta', type: 'text', required: false, maxLength: 50 },
    { name: 'brand', label: 'Marca', type: 'select', options: this.brands, required: true },
    { name: 'is_new', label: 'Es Nuevo', type: 'checkbox', required: false },
    { name: 'actual_price', label: 'Precio Actual', type: 'number', required: true },
    //{ name: 'product_code', label: 'Código de Producto', type: 'text', required: false, maxLength: 20 },
    { name: 'manufacturer_code', label: 'Código de Fabricante', type: 'text', required: true, maxLength: 20 },
    { name: 'warranty_level', label: 'Nivel de Garantía', type: 'select', required: true, options: [{value: 'Marca', viewValue: 'Marca'}, {value: 'Mayorista', viewValue: 'Mayorista'}] },
    { name: 'stock', label: 'Stock', type: 'number', required: true }
  ];

  constructor(
    private productService: ProductService,
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<ProductAddComponent>,
    private toastr: ToastrService,
    private brandService: BrandService
  ) { }

  ngOnInit() {
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
        const unitField = this.formConfig.find(field => field.name === 'brand');
        if (unitField) {
          unitField.options = this.brands;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar las marcas');
      }
    );
  }

  onFormSubmit(formValue: any) {
    formValue.sku = '';
    // formValue.sku = '23443';
    this.productService.addProduct(formValue)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      data => {
        this.crudEventsService.itemAdded.next();
        this.dialogRef.close();
      },
      error => {
        if (error.status === 400) {
        } else {
          
        }
      }
    );
  }
}