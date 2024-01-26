import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpecificationService } from 'src/app/services/api/specification.service'; 
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/api/product.service'; 
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-specification-add',
  templateUrl: './specification-add.component.html', 
  styleUrls: ['./specification-add.component.scss'] 
})
export class SpecificationAddComponent implements OnInit, OnDestroy {
  title = 'AÑADIR ESPECIFICACIÓNES';
  products = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  formConfig = [
    { name: 'name', label: 'Nombre', type: 'text', required: true, maxLength: 50 },
    { name: 'product', label: 'Producto', type: 'select', options: this.products, required: true },
  ];

  constructor(
    private specificationService: SpecificationService, 
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<SpecificationAddComponent>, 
    private toastr: ToastrService,
    private productService: ProductService, 
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
    this.specificationService.addSpecification(formValue)
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