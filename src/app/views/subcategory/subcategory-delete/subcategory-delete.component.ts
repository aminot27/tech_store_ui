import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubcategoryService } from 'src/app/services/api/subcategory.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-subcategory-delete',
  templateUrl: './subcategory-delete.component.html',
  styleUrls: ['./subcategory-delete.component.scss']
})
export class SubcategoryDeleteComponent implements OnInit, OnDestroy{
  title = 'SUBCATEGORÍA';
  id: number
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SubcategoryDeleteComponent>,
    private subcategoryService: SubcategoryService,
    private toastr: ToastrService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.id = this.data.subcategory_id;
  }

  onConfirm(id: number): void {
    this.subcategoryService.deleteSubcategory(this.data.subcategory_id)
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