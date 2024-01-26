import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProductOutput } from 'src/app/models/product-output.model';
import { ProductOutputService } from 'src/app/services/api/product-output.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductOutputAddComponent } from '../product-output-add/product-output-add.component';
import { CrudEventsService } from 'src/app/services/crud-events.service'; 
import { ProductOutputDeleteComponent } from '../product-output-delete/product-output-delete.component';
import { ProductOutputEditComponent } from '../product-output-edit/product-output-edit.component';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/api/product.service';
import { ProductInputService } from 'src/app/services/api/product-input.service';

@Component({
  selector: 'app-product-output-list',
  templateUrl: './product-output-list.component.html',
  styleUrls: ['./product-output-list.component.scss']
})
export class ProductOutputListComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['product','reason', 'created', 'modified', 'status', 'quantity', 'movement_date'];
  columnNames: string[] = ['Nombre Producto', 'Razón', 'Creado', 'Modificado', 'Estado', 'Cantidad', 'Fecha de Movimiento'];
  products: IProduct[] = []; 
  dataSource: MatTableDataSource<IProductOutput>;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private productOutputService: ProductOutputService,
    private dialog: MatDialog,
    private productService: ProductService,
    private crudEventsService: CrudEventsService) { 
    this.dataSource = new MatTableDataSource<IProductOutput>([]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
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

  loadProducts(): void {
    this.productService.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(products => {
        this.products = products;
        this.updateTableData();
      });
  }

  updateTableData(): void {
    this.productOutputService.getProductOutputs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(inputs => {
        const dataWithProductNames = inputs.map(input => ({
          ...input,
          product: this.products.find(p => p.product_id === input.product_output_id)?.name || 'Nombre no encontrado'
        }));
        this.dataSource.data = dataWithProductNames;
      });
  }

  openEditModal(element: any){
    const dialogRef = this.dialog.open(ProductOutputEditComponent, {
      data: { productOutput: element }
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
    const dialogRef = this.dialog.open(ProductOutputDeleteComponent, {
      data: { product_output_id: element.product_output_id }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  addProductOutputModal(){
    const dialogRef = this.dialog.open(ProductOutputAddComponent, {});
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}