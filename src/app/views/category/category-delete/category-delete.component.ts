import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { successToasterConfig } from 'src/app/constats/toaster.configs';
import { CategoryService } from 'src/app/services/api/category.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit, OnDestroy{
  title = 'CATEGORÍA';
  id: number
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CategoryDeleteComponent>,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.id = this.data.category_id;
  }

  onConfirm(id: number): void {
    this.categoryService.deleteCategory(this.data.category_id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
      }
    });
  }
}
