import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISubcategory } from 'src/app/models/subcategory.model';
import { SubcategoryService } from 'src/app/services/api/subcategory.service';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialog } from '@angular/material/dialog';
import { SubcategoryEditComponent } from '../subcategory-edit/subcategory-edit.component';
import { SubcategoryDeleteComponent } from '../subcategory-delete/subcategory-delete.component';
import { SubcategoryAddComponent } from '../subcategory-add/subcategory-add.component';
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ICategory } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/api/category.service';

@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.scss']
})
export class SubcategoryListComponent implements OnDestroy, OnInit{
  displayedColumns: string[] = ["description","categoryDescription", "code", "order", "created", "modified", ];
  columnNames: string[] = ["Descripción", "Categoría", "Código", "Orden", "Creado", "Modificado"];
  dataSource: MatTableDataSource<ISubcategory>;
  private categories: ICategory[] = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService) { 
    this.dataSource = new MatTableDataSource<ISubcategory>([]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.loadCategories();
    this.updateTableData();
    this.crudEventsService.itemAdded
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.updateTableData();
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  getCategoryDescription(categoryId: number): string {
    const category = this.categories.find(c => c.category_id === categoryId);
    return category ? category.description : 'N/A';
  }

  updateTableData(): void {
    this.subcategoryService.getSubcategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(subcategories => {
        this.dataSource.data = subcategories.map(subcategory => ({
          ...subcategory,
          categoryDescription: this.getCategoryDescription(subcategory.category)
        }));
      });
  }

  openEditModal(subcategory: ISubcategory): void{
    const dialogRef = this.dialog.open(SubcategoryEditComponent, {
      data: { subcategory }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openDeleteModal(element: any): void{
    const dialogRef = this.dialog.open(SubcategoryDeleteComponent, {
      data: { subcategory_id: element.subcategory_id }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openAddModal():void{
    const dialogRef = this.dialog.open(SubcategoryAddComponent, { });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {

    });
  }
}
