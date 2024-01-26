import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubcategoryService } from 'src/app/services/api/subcategory.service';
import { ToastrService } from 'ngx-toastr';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/services/api/category.service';

@Component({
  selector: 'app-subcategory-edit',
  templateUrl: './subcategory-edit.component.html',
  styleUrls: ['./subcategory-edit.component.scss']
})
export class SubcategoryEditComponent implements OnInit, OnDestroy {
  title: string = 'EDITAR SUBCATEGORÍA';
  categories = [];
  subcategoryFormConfig: any;
  private orderValue: number;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private subcategoryService: SubcategoryService,
    public dialogRef: MatDialogRef<SubcategoryEditComponent>,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {
    this.orderValue = this.data.subcategory.order;
    this.subcategoryFormConfig = [
      { name: 'code', label: 'Código', type: 'text', required: true, maxLength: 5, value: data.subcategory.code },
      { name: 'description', label: 'Descripción', type: 'text', required: true, maxLength: 30, value: data.subcategory.description },
      { name: 'category', label: 'Categoría', type: 'select', options: this.categories, required: true, value: data.subcategory.category }
    ];
  }

  ngOnInit(){
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadCategories(){
    this.categoryService.getCategories()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.categories = data.map(category => ({value: category.category_id, viewValue: category.description}));
        const categoryField = this.subcategoryFormConfig.find(field => field.name === 'category');
        if (categoryField){
          categoryField.options = this.categories;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar las categorias');
      }
      );
  }

  onSubmit(event: any): void {
    const payload = {
      ...event,
      order: this.orderValue
    };

    this.subcategoryService.updateSubcategory(this.data.subcategory.subcategory_id, payload)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
        response => {
          this.dialogRef.close(true);
        },
        error => {
        }
      );
  }
}