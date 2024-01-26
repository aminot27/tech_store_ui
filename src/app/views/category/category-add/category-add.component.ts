import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/api/category.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit, OnDestroy {
  title = 'AÑADIR CATEGORÍA';
  highestOrder: number;
  private unsubscribe$: Subject<any> = new Subject<any>();
  formConfig = [
    { name: 'description', label: 'Descripción', type: 'text', required: true, maxLength: 30 },
    //{ name: 'code', label: 'Código', type: 'text', required: true, maxLength: 5 },
  ];

  constructor(
    private categoryService: CategoryService,
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<CategoryAddComponent>,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.fetchHighestOrder();
  }

  fetchHighestOrder() {
    this.categoryService.getHighestOrder()
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

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onFormSubmit(formValue: any) {
    formValue.order = this.highestOrder;
    formValue.code = String(this.highestOrder).padStart(3, '0');;
    this.categoryService.addCategory(formValue)
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