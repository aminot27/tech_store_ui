import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProductPresentation } from 'src/app/models/product-presentation.model';
import { ProductPresentationService } from 'src/app/services/api/product-presentation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductPresentationAddComponent } from '../product-presentation-add/product-presentation-add.component';
import { CrudEventsService } from 'src/app/services/crud-events.service'; 
import { ProductPresentationDeleteComponent } from '../product-presentation-delete/product-presentation-delete.component';
import { ProductPresentationEditComponent } from '../product-presentation-edit/product-presentation-edit.component';
import { takeUntil, forkJoin } from "rxjs";
import { Subject } from "rxjs";
import { IProduct } from 'src/app/models/product.model';
import { IPresentation } from 'src/app/models/presentation.model';
import { ProductService } from 'src/app/services/api/product.service';
import { PresentationService } from 'src/app/services/api/presentation.service';

@Component({
  selector: 'app-product-presentation-list',
  templateUrl: './product-presentation-list.component.html',
  styleUrls: ['./product-presentation-list.component.scss']
})
export class ProductPresentationListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['productName', 'presentationName', 'created', 'modified'];
  columnNames: string[] = ['Producto', 'Presentación', 'Creado', 'Modificado'];
  dataSource: MatTableDataSource<IProductPresentation>;
  private unsubscribe$: Subject<any> = new Subject<any>();
  private products: IProduct[] = [];
  private presentations: IPresentation[] = [];

  constructor(
    private productPresentationService: ProductPresentationService,
    private productService: ProductService,
    private presentationService: PresentationService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService) { 
    this.dataSource = new MatTableDataSource<IProductPresentation>([]);
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadPresentations();
    this.updateTableData();
    this.crudEventsService.itemAdded
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.updateTableData();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadProducts(): void {
    this.productService.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(products => {
        this.products = products;
      });
  }

  loadPresentations(): void {
    this.presentationService.getPresentations()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(presentations => {
        this.presentations = presentations;
      });
  }

  getProductName(productId: number): string{
    const product = this.products.find(u => u.product_id === productId);
    return product ? product.name : 'N/A';
  }

  getPresentationName(presentationId: number): string {
    const presentation = this.presentations.find(u => u.presentation_id === presentationId);
    return presentation ? presentation.description : 'N/A';
  }

  updateTableData(): void {
    forkJoin({
      product_presentations: this.productPresentationService.getProductPresentations(),
      products: this.productService.getProducts(),
      presentations: this.presentationService.getPresentations() 
    })
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(({ product_presentations, products, presentations }) => {
      this.products = products;
      this.presentations = presentations;
      this.dataSource.data = product_presentations.map(presentation => ({
        ...presentation,
        productName: this.getProductName(presentation.product),
        presentationName: this.getPresentationName(presentation.presentation) 
      }));
    });
  }

  openEditModal(element: IProductPresentation): void{
    const dialogRef = this.dialog.open(ProductPresentationEditComponent, {
      data: { element }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openDeleteModal(element: IProductPresentation): void{
    const dialogRef = this.dialog.open(ProductPresentationDeleteComponent, {
      data: { product_presentation_id: element.product_presentation_id }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  addProductPresentationModal(): void{
    const dialogRef = this.dialog.open(ProductPresentationAddComponent, {});
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}