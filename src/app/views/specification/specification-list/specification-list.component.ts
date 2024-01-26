import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISpecification } from 'src/app/models/specification.model'; 
import { SpecificationService } from 'src/app/services/api/specification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SpecificationAddComponent } from '../specification-add/specification-add.component';
import { CrudEventsService } from 'src/app/services/crud-events.service'; 
import { SpecificationDeleteComponent } from '../specification-delete/specification-delete.component';
import { SpecificationEditComponent } from '../specification-edit/specification-edit.component';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/api/product.service';

@Component({
  selector: 'app-specification-list',
  templateUrl: './specification-list.component.html',
  styleUrls: ['./specification-list.component.scss']
})
export class SpecificationListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'productName', 'created', 'modified'];
  columnNames: string[] = ['Nombre', 'Producto', 'Creado', 'Modificado'];
  dataSource: MatTableDataSource<ISpecification>;
  private unsubscribe$: Subject<any> = new Subject<any>();
  private products: IProduct[] = [];

  
  constructor(
    private specificationService: SpecificationService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService,
    private productService: ProductService,
    ) { 
    this.dataSource = new MatTableDataSource<ISpecification>([]);
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
      });
  }

  getProductName(productId: number): string{
    const product = this.products.find(u => u.product_id === productId);
    return product ? product.name : 'N/A';
  }

  updateTableData(): void {
    forkJoin({
      specifications: this.specificationService.getSpecifications(),
      products: this.productService.getProducts() 
    })
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(({ specifications, products }) => {
      this.products = products;
      this.dataSource.data = specifications.map(spec => ({
        ...spec,
        productName: this.getProductName(spec.product)
      }));
    });
  }

  openEditModal(element: any){
    const dialogRef = this.dialog.open(SpecificationEditComponent, {
      data: { specification: element }
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
    const dialogRef = this.dialog.open(SpecificationDeleteComponent, {
      data: { specification_id: element.specification_id }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  addSpecificationModal(){
    const dialogRef = this.dialog.open(SpecificationAddComponent, {});
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}