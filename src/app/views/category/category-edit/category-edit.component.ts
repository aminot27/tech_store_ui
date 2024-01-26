import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/api/category.service';
import { MatDialogRef } from '@angular/material/dialog';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnDestroy {
  title: string = 'EDITAR CATEGORÍA';
  categoryFormConfig: any;
  private orderValue: number;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    private toastr: ToastrService
  ) {
    this.orderValue = this.data.category.order;
    this.categoryFormConfig = [
      { name: 'description', label: 'Descripción', type: 'text', required: true, maxLength: 30, value: this.data.category.description },
      { name: 'code', label: 'Código', type: 'text', required: true, maxLength: 5, value: this.data.category.code },
    ];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onSubmit(event: any): void {
    const payload = {
      ...event,
      order: this.orderValue
    };

    this.categoryService.updateCategory(this.data.category.category_id, payload)
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