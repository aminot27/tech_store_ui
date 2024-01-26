import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SpecificationService } from 'src/app/services/api/specification.service'; 
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/api/product.service'; 
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-specification-edit',
  templateUrl: './specification-edit.component.html', 
  styleUrls: ['./specification-edit.component.scss'] 
})
export class SpecificationEditComponent implements OnInit, OnDestroy {
  title = 'EDITAR ESPECIFICACIÓN DE PRODUCTO';
  products = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  formConfig: any;

  constructor(
    private specificationService: SpecificationService, 
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<SpecificationEditComponent>, 
    private toastr: ToastrService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formConfig = [
      { name: 'name', label: 'Nombre', type: 'text', required: true, maxLength: 50, value: data.specification.name },
      { name: 'product', label: 'Producto', type: 'select', options: this.products, required: true, value: data.specification.product },
    ];
  }

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
        this.products = data.map(product => ({ value: product.product_id, viewValue: product.name }));
        const productField = this.formConfig.find(field => field.name === 'product');
        if (productField) {
          productField.options = this.products;
          productField.value = this.data.specification.product;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar los productos');
      }
    );
  }

  onSubmit(formValue: any) {
    this.specificationService.updateSpecification(this.data.specification.specification_id, formValue)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe( 
      data => {
        this.crudEventsService.itemUpdated.next();
        this.dialogRef.close(true);
      },
      error => {
      }
    );
  }
}