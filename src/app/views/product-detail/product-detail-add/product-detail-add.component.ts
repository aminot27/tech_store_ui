import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductDetailService } from 'src/app/services/api/product-detail.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/api/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { BrandService } from 'src/app/services/api/brand.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDetailEditComponent } from '../product-detail-edit/product-detail-edit.component';
import { IProductDetail } from 'src/app/models/product-detail.model';
import { ProductDetailDeleteComponent } from '../product-detail-delete/product-detail-delete.component';
import { GenericFormComponent } from 'src/app/containers/generic-form/generic-form.component';

@Component({
  selector: 'app-product-detail-add',
  templateUrl: './product-detail-add.component.html',
  styleUrls: ['./product-detail-add.component.scss']
})
export class ProductDetailAddComponent implements OnInit, OnDestroy {
  title = 'AÑADIR DETALLE DE PRODUCTO';
  products = [];
  brands = [];
  private unsubscribe$: Subject<any> = new Subject<any>();
  showAddButtonForSerial: boolean = true;
  displayedColumns: string[] = ['productName', 'serial_number'];
  columnNames: string[] = ['Producto', 'Nro Serie'];
  secondaryTableData: MatTableDataSource<any>;
  dataSource: MatTableDataSource<any>;
  showButtonsInForm: boolean = false;
  @ViewChild(GenericFormComponent) genericFormComponent: GenericFormComponent;

  formConfig = [
    { name: 'product', label: 'Producto', type: 'select', options: this.products, required: true },
    { name: 'serial_number', label: 'Número de Serie', type: 'text', required: true },
  ];

  constructor(
    private productDetailService: ProductDetailService,
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<ProductDetailAddComponent>,
    private toastr: ToastrService,
    private productService: ProductService,
    private brandService: BrandService,
    private dialog: MatDialog,
  ) {
    this.secondaryTableData = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadProducts();
    this.loadBrands();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadBrands() {
    this.brandService.getBrands()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (brandsData) => {
          this.brands = brandsData;
          this.loadProducts();
        },
        (error) => {
          this.toastr.error('Error al cargar las marcas');
        }
      );
  }

  loadProducts() {
    this.productService.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (productsData) => {
          this.products = productsData.map(product => {
            const brandName = this.brands.find(brand => brand.brand_id === product.brand)?.name || 'Marca no encontrada';
            return {
              value: product.product_id,
              viewValue: `${product.name} - ${brandName} -${product.small_description}`
            };
          });
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
    this.productDetailService.addProductDetail(formValue)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        newDetail => {
          this.crudEventsService.itemAdded.next();
          this.updateSecondaryTable(newDetail);
          this.genericFormComponent.resetForm();
        },
        error => {
          this.toastr.error('Error al añadir el detalle del producto');
        }
      );
  }

  updateTableData(): void {
    forkJoin({
      product_details: this.productDetailService.getProductDetails(),
      products: this.productService.getProducts()
    })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ product_details, products }) => {
        this.products = products;
        this.secondaryTableData = new MatTableDataSource(product_details.map(detail => ({
          ...detail,
          productName: this.getProductName(detail.product),
        })));
      });
  }

  updateSecondaryTable(newDetail: any): void {
    const productName = this.getProductName(newDetail.product);
    const newDetailWithProductName = {
      ...newDetail,
      productName: productName
    };
    this.secondaryTableData.data = [
      ...this.secondaryTableData.data,
      newDetailWithProductName
    ];
    this.secondaryTableData._updateChangeSubscription();
  }

  getProductName(productId: number): string {
    const product = this.products.find(u => u.value === productId);
    return product ? product.viewValue.split(' - ')[0] : 'N/A';
  }

  openEditModal(element: any) {
    const dialogRef = this.dialog.open(ProductDetailEditComponent, {
      data: { element: element },
      width: '1000px'
    });
  
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        console.log('Data entrante:', result); // Log the incoming data
        const index = this.secondaryTableData.data.findIndex(d => d.product_detail_id === element.product_detail_id);
        if (index > -1) {
          // If the result includes the product ID but not the productName, find the productName
          if (result.product && !result.productName) {
            result.productName = this.getProductName(result.product);
          }
          // Now assign the result to the existing element in the data source
          Object.assign(this.secondaryTableData.data[index], result);
          // Notify the data source that the data has changed to update the table view
          this.secondaryTableData._updateChangeSubscription();
        }
      }
    });
  }

  openDeleteModal(element: IProductDetail): void {
    const dialogRef = this.dialog.open(ProductDetailDeleteComponent, {
      data: { productDetail_id: element.product_detail_id }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        const index = this.secondaryTableData.data.findIndex(d => d.product_detail_id === element.product_detail_id);

        if (index > -1) {
          this.secondaryTableData.data.splice(index, 1);
          this.secondaryTableData._updateChangeSubscription();
          this.crudEventsService.itemDeleted.next(element.product_detail_id);  //Elimna en 2 y no en 1
        }
      }
    });
  }

}