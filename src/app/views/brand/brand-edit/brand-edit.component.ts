import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrandService } from 'src/app/services/api/brand.service'; 
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss']
})
export class BrandEditComponent implements OnDestroy{
  title: string = 'EDITAR MARCA';
  brandFormConfig: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private brandService: BrandService,
    public dialogRef: MatDialogRef<BrandEditComponent>,
    private toastr: ToastrService
  ) {
    this.brandFormConfig = [
      { name: 'name', label: 'Nombre', type: 'text', required: true, maxLength: 15, value: this.data.brand.name }
    ];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onSubmit(event: any): void {
    this.brandService.updateBrand(this.data.brand.brand_id, event)
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