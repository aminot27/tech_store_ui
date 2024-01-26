import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpecificationDetailService } from 'src/app/services/api/specification-detail.service';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SpecificationService } from 'src/app/services/api/specification.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-specification-detail-add',
  templateUrl: './specification-detail-add.component.html',
  styleUrls: ['./specification-detail-add.component.scss']
})
export class SpecificationDetailAddComponent implements OnInit, OnDestroy {
  title = 'AÑADIR DETALLE DE ESPECIFICACIÓN';
  specifications = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  formConfig = [
    { name: 'key', label: 'Clave', type: 'text', required: true, maxLength: 20 },
    { name: 'value', label: 'Valor', type: 'text', required: true, maxLength: 50 },
    { name: 'specification', label: 'Especificación', type: 'select', options: this.specifications, required: true },
  ];

  constructor(
    private specificationDetailService: SpecificationDetailService,
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<SpecificationDetailAddComponent>,
    private toastr: ToastrService,
    private specificationService: SpecificationService,
  ) { }

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
        }
      },
      (error) => {
        this.toastr.error('Error al cargar las especificaciones');
      }
    );
  }

  onFormSubmit(formValue: any) {
    this.specificationDetailService.addSpecificationDetail(formValue)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      data => {
        this.crudEventsService.itemAdded.next();
        this.dialogRef.close();
      },
      error => {
        this.toastr.error('Error al añadir el detalle de especificación');
      }
    );
  }
}