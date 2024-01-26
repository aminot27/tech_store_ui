import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProductInput } from 'src/app/models/product-input.model';
import { ProductInputService } from 'src/app/services/api/product-input.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductInputAddComponent } from '../product-input-add/product-input-add.component';
import { CrudEventsService } from 'src/app/services/crud-events.service'; 
import { ProductInputDeleteComponent } from '../product-input-delete/product-input-delete.component';
import { ProductInputEditComponent } from '../product-input-edit/product-input-edit.component';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/api/product.service';

@Component({
  selector: 'app-product-input-list',
  templateUrl: './product-input-list.component.html',
  styleUrls: ['./product-input-list.component.scss']
})
export class ProductInputListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['product','reason', 'created', 'modified', 'status', 'quantity', 'movement_date'];
  columnNames: string[] = ['Nombre Producto','Razón', 'Creado', 'Modificado', 'Estado', 'Cantidad', 'Fecha de Movimiento'];
  products: IProduct[] = []; 
  dataSource: MatTableDataSource<IProductInput>;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private productInputService: ProductInputService,
    private dialog: MatDialog,
    private productService: ProductService,
    private crudEventsService: CrudEventsService) { 
    this.dataSource = new MatTableDataSource<IProductInput>([]);
  }

  ngOnInit(): void {
    this.loadProducts();
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
        this.updateTableData();
      });
  }

  updateTableData(): void {
    this.productInputService.getProductInputs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(inputs => {
        const dataWithProductNames = inputs.map(input => ({
          ...input,
          product: this.products.find(p => p.product_id === input.product_input_id)?.name || 'Nombre no encontrado'
        }));
        this.dataSource.data = dataWithProductNames;
      });
  }

  openEditModal(element: any){
    const dialogRef = this.dialog.open(ProductInputEditComponent, {
      data: { productInput: element }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openDeleteModal(element: any){
    const dialogRef = this.dialog.open(ProductInputDeleteComponent, {
      data: { product_input_id: element.product_input_id }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  addProductInputModal(){
    const dialogRef = this.dialog.open(ProductInputAddComponent, {});
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}