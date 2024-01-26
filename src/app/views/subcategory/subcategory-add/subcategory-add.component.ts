import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubcategoryService } from 'src/app/services/api/subcategory.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/services/api/category.service';

@Component({
  selector: 'app-subcategory-add',
  templateUrl: './subcategory-add.component.html',
  styleUrls: ['./subcategory-add.component.scss']
})
export class SubcategoryAddComponent implements OnInit, OnDestroy {
  title = 'AÑADIR SUBCATEGORÍA';
  categories = [];
  highestOrder: number;
  private unsubscribe$: Subject<any> = new Subject<any>();

  formConfig = [
    { name: 'description', label: 'Descripción', type: 'text', required: true, maxLength: 30 },
    { name: 'category', label: 'Categoría', type: 'select', options: this.categories, required: true },
  ];

  constructor(
    private subcategoryService: SubcategoryService,
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<SubcategoryAddComponent>,
    private toastr: ToastrService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.fetchHighestOrder();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.categories = data.map(category => ({ value: category.category_id, viewValue: category.description }))
        const subcategoryField = this.formConfig.find(field => field.name === 'category');
        if (subcategoryField) {
          subcategoryField.options = this.categories;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar las unidades');
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  fetchHighestOrder() {
    this.subcategoryService.getHighestOrder()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      highestOrder => {
        this.highestOrder = highestOrder ? highestOrder + 1 : 1;
      },
      error => {
        this.highestOrder = 1;
      }
    );
  }

  onFormSubmit(formValue: any) {
    const code = String(this.highestOrder).padStart(3, '0');
    formValue.code = code; 
    formValue.order = this.highestOrder;
  
    this.subcategoryService.addSubcategory(formValue)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      data => {
        this.crudEventsService.itemAdded.next();
        this.dialogRef.close();
      },
      error => {
        
      }
    );
  }
}