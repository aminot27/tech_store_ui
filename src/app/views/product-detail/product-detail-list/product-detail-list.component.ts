import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProductDetail } from 'src/app/models/product-detail.model';
import { ProductDetailService } from 'src/app/services/api/product-detail.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailAddComponent } from '../product-detail-add/product-detail-add.component';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { ProductDetailDeleteComponent } from '../product-detail-delete/product-detail-delete.component';
import { ProductDetailEditComponent } from '../product-detail-edit/product-detail-edit.component';
import { takeUntil, forkJoin } from "rxjs";
import { Subject } from "rxjs";
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/api/product.service';

@Component({
  selector: 'app-product-detail-list',
  templateUrl: './product-detail-list.component.html',
  styleUrls: ['./product-detail-list.component.scss']
})
export class ProductDetailListComponent implements OnDestroy, OnInit {
  displayedColumns: string[] = ['productName', 'serial_number', 'created', 'modified'];
  columnNames: string[] = ['Producto', 'NroSerie', 'Creado', 'Modificado'];
  dataSource: MatTableDataSource<IProductDetail>;
  private unsubscribe$: Subject<any> = new Subject<any>();
  private products: IProduct[] = [];

  constructor(
    private productDetailService: ProductDetailService,
    private productService: ProductService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService) { 
    this.dataSource = new MatTableDataSource<IProductDetail>([]);
  }

  ngOnInit(): void {
    this.loadProducts();
    this.updateTableData();
    this.crudEventsService.itemAdded
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.updateTableData();
    });
    this.crudEventsService.itemUpdated
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.updateTableData();
    });
    this.crudEventsService.itemDeleted
  .pipe(takeUntil(this.unsubscribe$))
  .subscribe((deletedId) => {
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

  getProductName(productId: number): string {
    const product = this.products.find(u => u.product_id === productId);
    return product ? product.name : 'N/A';
  }

  updateTableData(): void {
    forkJoin({
      product_details: this.productDetailService.getProductDetails(),
      products: this.productService.getProducts()
    })
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(({ product_details, products }) => {
      this.products = products;
      this.dataSource.data = product_details.map(detail => ({
        ...detail,
        productName: this.getProductName(detail.product)
      }));
    });
  }

  openEditModal(element: any){
    const dialogRef = this.dialog.open(ProductDetailEditComponent, {
      data: {element: element },
      width: '1000px'
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openDeleteModal(element: IProductDetail): void {
    const dialogRef = this.dialog.open(ProductDetailDeleteComponent, {
      data: { productDetail_id: element.product_detail_id }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  addProductDetailModal(){
    const dialogRef = this.dialog.open(ProductDetailAddComponent, {width: '1000px'});
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}