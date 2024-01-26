import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/api/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CrudEventsService } from 'src/app/services/crud-events.service'; 
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnDestroy, OnInit {
  displayedColumns: string[] = ['description','code','order','created', 'modified'];
  columnNames: string[] = ['Descripción', 'Código','Orden', 'Creado', 'Modificado'];
  dataSource: MatTableDataSource<ICategory>;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService
    ){ 
    this.dataSource = new MatTableDataSource<ICategory>([]);
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
    this.categoryService.getCategories()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => {
      this.dataSource.data = res;
    });
  }

  openEditModal(category: ICategory): void{
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: { category }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openDeleteModal(element: any): void{
    const dialogRef = this.dialog.open(CategoryDeleteComponent, {
      data: { category_id: element.category_id }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openAddModal():void{
    const dialogRef = this.dialog.open(CategoryAddComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {

    });
  }
}