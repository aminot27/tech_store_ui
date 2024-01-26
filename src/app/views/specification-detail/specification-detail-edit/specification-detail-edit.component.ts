import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { SpecificationDetailService } from 'src/app/services/api/specification-detail.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { SpecificationService } from 'src/app/services/api/specification.service';

@Component({
  selector: 'app-specification-detail-edit',
  templateUrl: './specification-detail-edit.component.html',
  styleUrls: ['./specification-detail-edit.component.scss']
})
export class SpecificationDetailEditComponent implements OnInit, OnDestroy {
  title = 'EDITAR ESPECIFICACIÓN DETALLE';
  specifications = [];
  private unsubscribe$: Subject<any> = new Subject<any>();
  formConfig: any;

  constructor(
    private specificationDetailService: SpecificationDetailService, 
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<SpecificationDetailEditComponent>, 
    private toastr: ToastrService,
    private specificationService: SpecificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formConfig = [
      { name: 'key', label: 'Clave', type: 'text', required: true, maxLength: 20, value: data.specification.key},
    { name: 'value', label: 'Valor', type: 'text', required: true, maxLength: 50,  value: data.specification.value},
    { name: 'specification', label: 'Especificación', type: 'select', options: this.specifications, required: true, value: data.specification.specification },
  ];
  }

  ngOnInit() {
    this.loadSpecifications();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadSpecifications() {
    this.specificationService.getSpecifications()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.specifications = data.map(spec => ({ value: spec.specification_id, viewValue: spec.name }))
        const specificationField = this.formConfig.find(field => field.name === 'specification');
        if (specificationField) {
          specificationField.options = this.specifications;
          specificationField.value = this.data.specification.specification;
        }
      },
      (error) => {
      }
    );
  }
  
  onSubmit(formValue: any) {
    this.specificationDetailService.updateSpecificationDetail(this.data.specification.specification_detail_id, formValue)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      data => {
        this.crudEventsService.itemUpdated.next();
        this.dialogRef.close();
      },
      error => {
      }
    );
  }

}
