import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBrand } from 'src/app/models/brand.model'; 
import { BrandService } from 'src/app/services/api/brand.service'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BrandAddComponent } from '../brand-add/brand-add.component'; 
import { CrudEventsService } from 'src/app/services/crud-events.service'; 
import { BrandDeleteComponent } from '../brand-delete/brand-delete.component'; 
import { BrandEditComponent } from '../brand-edit/brand-edit.component';
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnDestroy, OnInit {
  displayedColumns: string[] = ['name','created', 'modified'];
  columnNames: string[] = ['Nombre','Creado', 'Modificado'];
  dataSource: MatTableDataSource<IBrand>;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private brandService: BrandService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService
  ) { 
    this.dataSource = new MatTableDataSource<IBrand>([]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.updateTableData();
    this.crudEventsService.itemAdded
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.updateTableData();
    });
  }

  updateTableData(): void {
    this.brandService.getBrands() 
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      this.dataSource.data = res;
    });
  }

  openEditModal(brand: IBrand): void {
    const dialogRef = this.dialog.open(BrandEditComponent, {
      data: { brand }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openDeleteModal(element: any): void {
    const dialogRef = this.dialog.open(BrandDeleteComponent, {
      data: { brand_id: element.brand_id }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(BrandAddComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}