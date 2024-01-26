import { Component, OnInit } from '@angular/core';
import { PresentationService } from 'src/app/services/api/presentation.service';
import { UnitService } from 'src/app/services/api/unit.service'; 
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-presentation-add',
  templateUrl: './presentation-add.component.html',
  styleUrls: ['./presentation-add.component.scss']
})
export class PresentationAddComponent implements OnInit {
  title = 'AÑADIR PRESENTACIÓN';
  units = [];
  private unsubscribe$: Subject<any> = new Subject<any>();

  formConfig = [
    { name: 'unit', label: 'Nombre de Unidad', type: 'select', options: this.units, required: true }, 
    { name: 'description', label: 'Descripción', type: 'text', required: true, maxLength: 20, defaultValue: '-' },
    { name: 'quantity', label: 'Cantidad', type: 'number', required: true, min: 0, defaultValue: 0 },
    { name: 'is_min', label: '¿Es Mínimo?', type: 'checkbox', value: true }
  ];

  constructor(
    private presentationService: PresentationService,
    private unitService: UnitService, 
    private crudEventsService: CrudEventsService,
    private dialogRef: MatDialogRef<PresentationAddComponent>,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.loadUnits();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadUnits() {
    this.unitService.getUnits()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.units = data.map(unit => ({ value: unit.unit_id, viewValue: unit.name }))
        const unitField = this.formConfig.find(field => field.name === 'unit');
        if (unitField) {
          unitField.options = this.units;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar las unidades');
      }
    );
  }

  onFormSubmit(formValue: any) {
    this.presentationService.addPresentation(formValue)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      data => {
        this.crudEventsService.itemAdded.next();
        this.dialogRef.close();
      },
      error => {
        this.toastr.error('Error al añadir la presentación');
      }
    );
  }
}