import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProductSubcategory } from 'src/app/models/product-subcategory.model';
import { ProductSubcategoryService } from 'src/app/services/api/product-subcategory.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductSubcategoryAddComponent } from '../product-subcategory-add/product-subcategory-add.component';
import { CrudEventsService } from 'src/app/services/crud-events.service'; 
import { ProductSubcategoryDeleteComponent } from '../product-subcategory-delete/product-subcategory-delete.component';
import { ProductSubcategoryEditComponent } from '../product-subcategory-edit/product-subcategory-edit.component';
import { takeUntil, forkJoin } from "rxjs";
import { Subject } from "rxjs";
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/api/product.service';
import { ISubcategory } from 'src/app/models/subcategory.model';
import { SubcategoryService } from 'src/app/services/api/subcategory.service';

@Component({
  selector: 'app-product-subcategory-list',
  templateUrl: './product-subcategory-list.component.html',
  styleUrls: ['./product-subcategory-list.component.scss']
})
export class ProductSubcategoryListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['productName','subcategoryName','created', 'modified'];
  columnNames: string[] = ['Producto','Subcategoría','Creado', 'Modificado'];
  dataSource: MatTableDataSource<IProductSubcategory>;
  private unsubscribe$: Subject<any> = new Subject<any>();
  private products: IProduct[] = [];
  private subcategories: ISubcategory[] = [];

  constructor(
    private productSubcategoryService: ProductSubcategoryService,
    private productService: ProductService,
    private subcategoryService: SubcategoryService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService) { 
    this.dataSource = new MatTableDataSource<IProductSubcategory>([]);
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadSubcategories();
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

  loadSubcategories(): void {
    this.subcategoryService.getSubcategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(subcategories => {
        this.subcategories = subcategories;
      });
  }

  getProductName(productId: number): string{
    const product = this.products.find(u => u.product_id === productId);
    return product ? product.name : 'N/A';
  }

  getSubcategoryName(subcategoryId: number): string {
    const subcategory = this.subcategories.find(u => u.subcategory_id === subcategoryId);
    return subcategory ? subcategory.description : 'N/A';
  }

  updateTableData(): void {
    forkJoin({
      product_subcategories: this.productSubcategoryService.getProductSubcategories(),
      products: this.productService.getProducts(),
      subcategories: this.subcategoryService.getSubcategories() 
    })
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(({ product_subcategories, products, subcategories }) => {
      this.products = products;
      this.subcategories = subcategories;
      this.dataSource.data = product_subcategories.map(subcategory => ({
        ...subcategory,
        productName: this.getProductName(subcategory.product),
        subcategoryName: this.getSubcategoryName(subcategory.subcategory) 
      }));
    });
  }

  openEditModal(element: IProductSubcategory): void{
    const dialogRef = this.dialog.open(ProductSubcategoryEditComponent, {
      data: { element }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openDeleteModal(element: any){
    const dialogRef = this.dialog.open(ProductSubcategoryDeleteComponent, {
      data: { product_subcategory_id: element.product_subcategory_id }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  addProductSubcategoryModal(){
    const dialogRef = this.dialog.open(ProductSubcategoryAddComponent, {});
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}