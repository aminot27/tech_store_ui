import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductPresentationService } from 'src/app/services/api/product-presentation.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PresentationService } from 'src/app/services/api/presentation.service';
import { ProductService } from 'src/app/services/api/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-presentation-add',
  templateUrl: './product-presentation-add.component.html',
  styleUrls: ['./product-presentation-add.component.scss']
})
export class ProductPresentationAddComponent implements OnInit, OnDestroy{
  title = 'AÑADIR PRESENTACIÓN DE PRODUCTOS';
  presentations = [];
  products = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  formConfig = [
    { name: 'product', label: 'Producto', type: 'select', options: this.products, required: true },
    { name: 'presentation', label: 'Presentación', type: 'select', options: this.presentations, required: true }
  ];

  constructor(
    private productPresentationService: ProductPresentationService,
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<ProductPresentationAddComponent>,
    private toastr: ToastrService,
    private presentationService: PresentationService,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.loadPresentations();
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadPresentations() {
    this.presentationService.getPresentations()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.presentations = data.map(presentation => ({ value: presentation.presentation_id, viewValue: presentation.description }))
        const presentationField = this.formConfig.find(field => field.name === 'presentation');
        if (presentationField) {
          presentationField.options = this.presentations;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar las presentaciones');
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
        this.toastr.error('Error al cargar los productos');
      }
    );
  }

  onFormSubmit(formValue: any) {
    this.productPresentationService.addProductPresentation(formValue)
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