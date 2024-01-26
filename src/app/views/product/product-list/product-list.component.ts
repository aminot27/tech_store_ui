import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/api/product.service'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component'; 
import { CrudEventsService } from 'src/app/services/crud-events.service'; 
import { ProductDeleteComponent } from '../product-delete/product-delete.component'; 
import { ProductEditComponent } from '../product-edit/product-edit.component'; 
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { IBrand } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/api/brand.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnDestroy, OnInit{
  displayedColumns: string[] = ['sku', 'name', 'brandName','stock', 'actual_price','is_new',  'product_code', 'manufacturer_code', 'warranty_level'];
  columnNames: string[] = ['SKU', 'Nombre','Marca','Stock', 'Precio Actual', 'Es Nuevo', 'Código de Producto', 'Código de Fabricante', 'Nivel de Garantía'];
  dataSource: MatTableDataSource<IProduct>;
  private brands: IBrand[] = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService,
    private brandService: BrandService,) { 
    this.dataSource = new MatTableDataSource<IProduct>([]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.loadBrands();
    this.updateTableData();
    this.crudEventsService.itemAdded
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.updateTableData();
    });
  }


  loadBrands(): void {
    this.brandService.getBrands()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(brands => {
        console.log('Brands loaded:', brands);
        this.brands = brands;
      });
  }

  getBrandName(brandId: number): string {
    const brand = this.brands.find(b => b.brand_id === brandId);
    return brand ? brand.name : 'N/A';
  }

  updateTableData(): void {
    forkJoin({
      products: this.productService.getProducts(),
      brands: this.brandService.getBrands()
    })
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(({ products, brands }) => {
      this.brands = brands;
      this.dataSource.data = products.map(product => ({
        ...product,
        brandName: this.getBrandName(product.brand)
      }));
    });
  }

  openEditModal(element: any){
    const dialogRef = this.dialog.open(ProductEditComponent, {
      data: { product: element }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openDeleteModal(element: any){
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: { product_id: element.product_id }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  addProductModal(){
    const dialogRef = this.dialog.open(ProductAddComponent, {});
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}