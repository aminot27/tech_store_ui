import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from 'src/app/services/api/product.service';
import { PresentationService } from 'src/app/services/api/presentation.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { ProductPresentationService } from 'src/app/services/api/product-presentation.service';

@Component({
  selector: 'app-product-presentation-edit',
  templateUrl: './product-presentation-edit.component.html',
  styleUrls: ['./product-presentation-edit.component.scss']
})
export class ProductPresentationEditComponent implements OnInit, OnDestroy {
  title: string = 'EDITAR PRESENTACIÓN DE PRODUCTO';
  productPresentationFormConfig: any;
  products = [];
  presentations = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductPresentationEditComponent>,
    private toastr: ToastrService,
    private productService: ProductService,
    private presentationService: PresentationService,
    private crudEventsService: CrudEventsService,
    private productPresentationService: ProductPresentationService,
  ) {
    this.productPresentationFormConfig = [
      { name: 'product', label: 'Producto', type: 'select', options: this.products, required: true, value: data.element.product },
      { name: 'presentation', label: 'Presentación', type: 'select', options: this.presentations, required: true, value: data.element.presentation }
    ];
  }

  ngOnInit() {
    this.loadProducts();
    this.loadPresentations();
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
        const productField = this.productPresentationFormConfig.find(field => field.name === 'product');
        if (productField) {
          productField.options = this.products;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar los productos');
      }
    );
  }

  loadPresentations() {
    this.presentationService.getPresentations()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.presentations = data.map(presentation => ({ value: presentation.presentation_id, viewValue: presentation.description }));
        const presentationField = this.productPresentationFormConfig.find(field => field.name === 'presentation');
        if (presentationField) {
          presentationField.options = this.presentations;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar las presentaciones');
      }
    );
  }

  onSubmit(formValue: any) {
    this.productPresentationService.updateProductPresentation(this.data.element.product_presentation_id, formValue)
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