import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/api/brand.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { badRequestToasterConfig, successToasterConfig } from 'src/app/constats/toaster.configs';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.scss']
})
export class BrandAddComponent implements OnInit, OnDestroy {
  title = 'AÑADIR MARCA';
  private unsubscribe$: Subject<any> = new Subject<any>();

  formConfig = [
    { name: 'name', label: 'Nombre', type: 'text', required: true, maxLength: 15 }
  ];

  constructor(
    private brandService: BrandService, 
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<BrandAddComponent>,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onFormSubmit(formValue: any) {
    this.brandService.addBrand(formValue)
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